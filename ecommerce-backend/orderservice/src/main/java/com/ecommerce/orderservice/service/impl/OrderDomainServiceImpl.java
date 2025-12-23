package com.ecommerce.orderservice.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.common.webflux.pagination.PageResponse;
import com.ecommerce.orderservice.dto.OrderDTO;
import com.ecommerce.orderservice.enums.OrderStatus;
import com.ecommerce.orderservice.model.Order;
import com.ecommerce.orderservice.model.OrderItem;
import com.ecommerce.orderservice.repository.OrderRepository;
import com.ecommerce.orderservice.service.OrderDomainService;

import jakarta.persistence.EntityNotFoundException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class OrderDomainServiceImpl implements OrderDomainService {

    private static final Logger log =
            LoggerFactory.getLogger(OrderDomainServiceImpl.class);

    private final OrderRepository orderRepository;

    public OrderDomainServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    public Order create(OrderDTO dto, Long userId, Long storeId) {

        Order order = new Order();
        order.setUserId(userId);
        order.setStoreId(storeId);
        order.setStatus(OrderStatus.PENDING);

        List<OrderItem> items = new ArrayList<>();

        for (int i = 0; i < dto.items().size(); i++) {
            OrderItem oi = new OrderItem();
            oi.setProductId(dto.items().get(i).productId());
            oi.setQuantity(dto.items().get(i).quantity());
            oi.setPrice(dto.items().get(i).price());
            oi.setStoreId(storeId);
            oi.attach(order);
            items.add(oi);
        }

        order.setItems(items);

        Order saved = orderRepository.save(order);

        log.info("Order saved. orderId={}, storeId={}", saved.getId(), storeId);

        return saved;
    }

    @Override
    @Transactional
    public Order updateStatus(Long orderId, Long storeId, OrderStatus status) {

        Order order = get(orderId, storeId);
        order.setStatus(status);

        Order updated = orderRepository.save(order);

        log.info(
                "Order status updated. orderId={}, status={}",
                orderId,
                status
        );

        return updated;
    }

    @Override
    public Order get(Long orderId, Long storeId) {

        return orderRepository
                .findByIdAndStoreId(orderId, storeId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Order not found")
                );
    }

    @Override
    public Mono<Order> createReactive(
            OrderDTO dto,
            Long userId,
            Long storeId
    ) {

        return Mono.fromCallable(() ->
                        create(dto, userId, storeId)
                )
                .subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    public Mono<Order> updateStatusReactive(
            Long orderId,
            Long storeId,
            OrderStatus status
    ) {

        return Mono.fromCallable(() ->
                        updateStatus(orderId, storeId, status)
                )
                .subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    public Mono<Order> getReactive(Long orderId, Long storeId) {

        return Mono.fromCallable(() ->
                        get(orderId, storeId)
                )
                .subscribeOn(Schedulers.boundedElastic());
    }

	@Override
	public Mono<Order> getById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<PageResponse<Order>> getAll(int page, int size) {
		// TODO Auto-generated method stub
		return null;
	}
}
