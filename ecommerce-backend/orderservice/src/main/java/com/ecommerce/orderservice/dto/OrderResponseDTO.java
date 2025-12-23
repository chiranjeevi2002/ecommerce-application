package com.ecommerce.orderservice.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponseDTO(
        Long id,
        Long userId,
        Long storeId,
        Double totalAmount,
        String status,
        LocalDateTime createdAt,
        List<OrderItemDTO> items
) {}
