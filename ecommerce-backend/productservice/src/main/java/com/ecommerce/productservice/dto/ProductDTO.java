package com.ecommerce.productservice.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductDTO(
        @NotBlank(message = "Product name is required")
        String name,
        String description,
        @NotNull(message = "Price is required")
        Double price,
        @NotNull(message = "Quantity is required")
        Integer quantity,
        @NotNull(message = "Category is required")
        Long categoryId,
        List<String> imageUrls
) { }
