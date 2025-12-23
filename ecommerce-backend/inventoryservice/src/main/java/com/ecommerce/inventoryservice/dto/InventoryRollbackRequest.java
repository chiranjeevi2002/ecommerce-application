package com.ecommerce.inventoryservice.dto;

import java.util.List;

public record InventoryRollbackRequest(
        Long storeId,
        Long orderId,
        List<InventoryRollbackItem> items
) {}