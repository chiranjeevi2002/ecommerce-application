package com.ecommerce.orderservice.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ecommerce.common.webflux.context.ReactiveContextHolder;
import com.ecommerce.common.workflow.OrderWorkflowStep;
import com.ecommerce.orderservice.client.InventoryClient;
import com.ecommerce.orderservice.client.PaymentClient;
import com.ecommerce.orderservice.client.ProductClient;
import com.ecommerce.orderservice.dto.OrderDTO;
import com.ecommerce.orderservice.dto.ProductValidationResult;
import com.ecommerce.orderservice.enums.OrderStatus;
import com.ecommerce.orderservice.model.Order;
import com.ecommerce.orderservice.service.OrderCancellationService;
import com.ecommerce.orderservice.service.OrderDomainService;
import com.ecommerce.orderservice.service.OrderWorkflowService;
import com.ecommerce.orderservice.service.workflow.WorkflowContext;
import com.ecommerce.orderservice.service.workflow.WorkflowStep;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class OrderWorkflowServiceImpl implements OrderWorkflowService {

    private static final Logger log =
            LoggerFactory.getLogger(OrderWorkflowServiceImpl.class);

    private final OrderDomainService domainService;
    private final ProductClient productClient;
    private final InventoryClient inventoryClient;
    private final PaymentClient paymentClient;
    private final OrderCancellationService cancellationService;

    public OrderWorkflowServiceImpl(
            OrderDomainService domainService,
            ProductClient productClient,
            InventoryClient inventoryClient,
            PaymentClient paymentClient,
            OrderCancellationService cancellationService
    ) {
        this.domainService = domainService;
        this.productClient = productClient;
        this.inventoryClient = inventoryClient;
        this.paymentClient = paymentClient;
        this.cancellationService = cancellationService;
    }

    @Override
    public Mono<Order> createOrder(OrderDTO dto) {

        return ReactiveContextHolder.get()
                .flatMap(ctx ->
                        createOrderInternal(
                                dto,
                                ctx.userId(),
                                ctx.storeId(),
                                ctx.traceId()
                        )
                );
    }

    @Override
    public Mono<Order> finalizePayment(Long orderId, boolean success) {

        return ReactiveContextHolder.get()
                .flatMap(ctx ->
                        finalizePaymentInternal(
                                orderId,
                                ctx.storeId(),
                                success
                        )
                );
    }

    @Override
    public Mono<Order> cancelOrder(Long orderId) {

        return ReactiveContextHolder.get()
                .flatMap(ctx ->
                        cancelOrderInternal(
                                orderId,
                                ctx.userId(),
                                ctx.storeId()
                        )
                );
    }

    private Mono<Order> createOrderInternal(
            OrderDTO dto,
            Long userId,
            Long storeId,
            String traceId
    ) {

        log.info(
                "Order workflow started. traceId={}, userId={}, storeId={}",
                traceId,
                userId,
                storeId
        );

        WorkflowContext context =
                WorkflowContext.start(userId, storeId, traceId);

        return executeCreateWorkflow(dto, context)
                .map(WorkflowContext::order)
                .doOnSuccess(order ->
                        log.info(
                                "Order workflow completed. orderId={}, traceId={}",
                                order.getId(),
                                traceId
                        )
                );
    }

    private Mono<WorkflowContext> executeCreateWorkflow(
            OrderDTO dto,
            WorkflowContext context
    ) {

        return validateProducts(dto, context)
                .then(createOrderStep(dto).execute(context))
                .flatMap(next -> reserveInventoryStep(dto).execute(next))
                .flatMap(next -> initiatePaymentStep().execute(next));
    }

    private Mono<Void> validateProducts(
            OrderDTO dto,
            WorkflowContext context
    ) {

        List<Long> productIds = extractProductIds(dto);

        log.debug(
                "Validating products. storeId={}, productIds={}",
                context.storeId(),
                productIds
        );

        return productClient
                .validateProducts(context.storeId(), productIds)
                .filter(ProductValidationResult::valid)
                .switchIfEmpty(
                        Mono.error(
                                new IllegalStateException("Invalid products in order")
                        )
                )
                .then();
    }

    private WorkflowStep createOrderStep(OrderDTO dto) {

        return ctx ->
                domainService
                        .createReactive(dto, ctx.userId(), ctx.storeId())
                        .doOnSuccess(order ->
                                log.info(
                                        "Order persisted. orderId={}",
                                        order.getId()
                                )
                        )
                        .map(order ->
                                ctx.withOrder(order)
                                   .markCompleted(
                                           OrderWorkflowStep.CREATE_ORDER.name()
                                   )
                        );
    }

    private WorkflowStep reserveInventoryStep(OrderDTO dto) {

        return ctx ->
                Flux.fromIterable(dto.items())
                        .flatMap(item ->
                                inventoryClient.decrease(
                                        item.productId(),
                                        item.quantity(),
                                        ctx.storeId()
                                )
                        )
                        .then(
                                domainService.updateStatusReactive(
                                        ctx.order().getId(),
                                        ctx.storeId(),
                                        OrderStatus.INVENTORY_RESERVED
                                )
                        )
                        .doOnSuccess(order ->
                                log.info(
                                        "Inventory reserved. orderId={}",
                                        order.getId()
                                )
                        )
                        .map(updated ->
                                ctx.withOrder(updated)
                                   .markCompleted(
                                           OrderWorkflowStep.RESERVE_INVENTORY.name()
                                   )
                        );
    }

    private WorkflowStep initiatePaymentStep() {

        return ctx ->
                paymentClient
                        .initiatePayment(
                                ctx.order().getId(),
                                ctx.order().getUserId(),
                                ctx.order().getTotalAmount(),
                                ctx.storeId()
                        )
                        .then(
                                domainService.updateStatusReactive(
                                        ctx.order().getId(),
                                        ctx.storeId(),
                                        OrderStatus.PAYMENT_PENDING
                                )
                        )
                        .doOnSuccess(order ->
                                log.info(
                                        "Payment initiated. orderId={}",
                                        order.getId()
                                )
                        )
                        .map(updated ->
                                ctx.withOrder(updated)
                                   .markCompleted(
                                           OrderWorkflowStep.INITIATE_PAYMENT.name()
                                   )
                        );
    }

    private List<Long> extractProductIds(OrderDTO dto) {

        List<Long> ids = new ArrayList<>();

        for (int i = 0; i < dto.items().size(); i++) {
            ids.add(dto.items().get(i).productId());
        }

        return ids;
    }

    private Mono<Order> finalizePaymentInternal(
            Long orderId,
            Long storeId,
            boolean success
    ) {

        OrderStatus status =
                success
                        ? OrderStatus.CONFIRMED
                        : OrderStatus.PAYMENT_FAILED;

        log.info(
                "Finalizing payment. orderId={}, success={}",
                orderId,
                success
        );

        return domainService.updateStatusReactive(
                orderId,
                storeId,
                status
        );
    }

    private Mono<Order> cancelOrderInternal(
            Long orderId,
            Long userId,
            Long storeId
    ) {

        log.info(
                "Cancel order requested. orderId={}, userId={}",
                orderId,
                userId
        );

        return domainService
                .getReactive(orderId, storeId)
                .filter(order -> order.getUserId().equals(userId))
                .switchIfEmpty(
                        Mono.error(
                                new SecurityException("Unauthorized order cancellation")
                        )
                )
                .filter(order ->
                        cancellationService.isCancelable(order.getStatus())
                )
                .switchIfEmpty(
                        Mono.error(
                                new IllegalStateException("Order cannot be cancelled")
                        )
                )
                .flatMap(order ->
                        cancellationService.rollbackInventory(order, storeId)
                                .then(
                                        cancellationService.rollbackPayment(order, storeId)
                                )
                                .then(
                                        domainService.updateStatusReactive(
                                                order.getId(),
                                                storeId,
                                                OrderStatus.CANCELLED
                                        )
                                )
                )
                .doOnSuccess(order ->
                        log.info(
                                "Order cancelled successfully. orderId={}",
                                order.getId()
                        )
                );
    }
}
