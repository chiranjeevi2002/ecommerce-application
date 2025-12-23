package com.ecommerce.inventoryservice.dto;


public record InventoryRollbackItem(
        Long productId,
        Integer quantity
) {}

