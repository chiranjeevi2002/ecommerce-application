package com.ecommerce.inventoryservice.dto;


import java.time.LocalDateTime;

public record InventoryResponse(
        Long id,
        Long productId,
        Integer availableQuantity,
        Long storeId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}

