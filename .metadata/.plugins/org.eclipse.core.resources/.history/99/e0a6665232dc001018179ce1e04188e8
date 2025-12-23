package com.ecommerce.inventoryservice.dto;


import java.time.Instant;
import java.util.List;

public record InventoryRollbackResponse(
        Long orderId,
        Long storeId,
        boolean rolledBack,
        List<Long> restoredItems,
        List<Long> skippedItems,
        Instant timestamp
) {}

