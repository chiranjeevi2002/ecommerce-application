package com.ecommerce.paymentservice.dto;

public record PaymentRequest(
        Long orderId,
        Long userId,
        Double amount,
        String paymentMethod
) {}
