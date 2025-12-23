package com.ecommerce.orderservice.dto;

import java.util.List;

public record ProductResponse(
        Long id,
        String name,
        String description,
        Double price,
        Integer quantity,
        Long categoryId,
        Long storeId,
        List<String> imageUrl
) {}
