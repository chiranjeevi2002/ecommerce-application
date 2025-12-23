package com.ecommerce.orderservice.service.impl;

import java.util.EnumSet;

import org.springframework.stereotype.Service;

import com.ecommerce.orderservice.client.InventoryClient;
import com.ecommerce.orderservice.client.PaymentClient;
import com.ecommerce.orderservice.enums.OrderStatus;
import com.ecommerce.orderservice.model.Order;
import com.ecommerce.orderservice.service.OrderCancellationService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class OrderCancellationServiceImpl implements OrderCancellationService {

    private final InventoryClient inventoryClient;
    private final PaymentClient paymentClient;

    public OrderCancellationServiceImpl(
            InventoryClient inventoryClient,
            PaymentClient paymentClient) {
        this.inventoryClient = inventoryClient;
        this.paymentClient = paymentClient;
    }

   
    
    @Override
    public boolean isCancelable(OrderStatus status) {
        return EnumSet.of(
                OrderStatus.PENDING,
                OrderStatus.INVENTORY_RESERVED,
                OrderStatus.PAYMENT_PENDING
        ).contains(status);
    }


    @Override
    public Mono<Void> rollbackInventory(Order order, Long storeId) {
        return Flux.fromIterable(order.getItems())
                .flatMap(item ->
                    inventoryClient.increase(
                        item.getProductId(),
                        item.getQuantity(),
                        storeId
                    )
                )
                .then();
    }

    @Override
    public Mono<Void> rollbackPayment(Order order, Long storeId) {
        if (order.getStatus() != OrderStatus.PAYMENT_PENDING) {
            return Mono.empty();
        }

        return paymentClient
                .cancelPayment(order.getId(), storeId)
                .then();
    }
}
