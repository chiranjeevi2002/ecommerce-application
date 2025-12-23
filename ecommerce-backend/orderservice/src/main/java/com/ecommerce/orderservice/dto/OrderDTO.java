package com.ecommerce.orderservice.dto;

import java.util.List;

public record OrderDTO(
        Long userId,
        Double totalAmount,
        List<OrderItemDTO> items
) {}
