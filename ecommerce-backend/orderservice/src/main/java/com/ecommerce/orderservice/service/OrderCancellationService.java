package com.ecommerce.orderservice.service;


import com.ecommerce.orderservice.enums.OrderStatus;
import com.ecommerce.orderservice.model.Order;
import reactor.core.publisher.Mono;

public interface OrderCancellationService {

    boolean isCancelable(OrderStatus status);

    Mono<Void> rollbackInventory(Order order, Long storeId);

    Mono<Void> rollbackPayment(Order order, Long storeId);
}
