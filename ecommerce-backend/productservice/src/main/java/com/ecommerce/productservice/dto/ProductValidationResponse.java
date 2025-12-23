package com.ecommerce.productservice.dto;

public record ProductValidationResponse(
        Long productId,
        boolean valid,
        String reason
) {}
