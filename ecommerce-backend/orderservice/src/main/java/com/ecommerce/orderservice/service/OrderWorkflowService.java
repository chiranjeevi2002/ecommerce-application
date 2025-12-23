package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.dto.OrderDTO;
import com.ecommerce.orderservice.model.Order;
import reactor.core.publisher.Mono;

public interface OrderWorkflowService {

    Mono<Order> createOrder(OrderDTO dto);

    Mono<Order> finalizePayment(Long orderId, boolean success);

    Mono<Order> cancelOrder(Long orderId);
    
}
