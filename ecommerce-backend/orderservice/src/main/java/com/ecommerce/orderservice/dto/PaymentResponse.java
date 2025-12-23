package com.ecommerce.orderservice.dto;

import java.time.LocalDateTime;

public record PaymentResponse(
        Long id,
        Long orderId,
        Double amount,
        String status,
        LocalDateTime createdAt
) {}
