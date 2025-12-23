package com.ecommerce.paymentservice.dto;

import java.time.LocalDateTime;

import com.ecommerce.paymentservice.enums.PaymentStatus;

public record PaymentResponse(
        Long id,
        Long orderId,
        Long userId,
        Double amount,
        PaymentStatus status,
        String transactionId,
        LocalDateTime createdAt,
        String message
) {}
