package com.ecommerce.orderservice.dto;

public record PaymentRequest(
        Long orderId,
        Long userId,
        Double amount,
        String method,
        Long storeId
) {}
