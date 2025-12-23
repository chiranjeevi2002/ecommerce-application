package com.ecommerce.orderservice.service;

import com.ecommerce.common.webflux.service.ReactiveGenericService;
import com.ecommerce.orderservice.dto.OrderDTO;
import com.ecommerce.orderservice.enums.OrderStatus;
import com.ecommerce.orderservice.model.Order;

import reactor.core.publisher.Mono;

public interface OrderDomainService
extends ReactiveGenericService<Order, Long> {

Order create(OrderDTO dto, Long userId, Long storeId);

Order updateStatus(Long orderId, Long storeId, OrderStatus status);

Order get(Long orderId, Long storeId);

Mono<Order> createReactive(OrderDTO dto, Long userId, Long storeId);

Mono<Order> updateStatusReactive(Long orderId, Long storeId, OrderStatus status);

Mono<Order> getReactive(Long orderId, Long storeId);
}

//public interface OrderDomainService {
//    Order create(OrderDTO dto, Long userId, Long storeId);
//    Order updateStatus(Long orderId, Long storeId, OrderStatus status);
//    Order get(Long orderId, Long storeId);
//}


