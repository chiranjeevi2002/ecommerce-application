package com.ecommerce.orderservice.dto;

import java.util.List;

public record InventoryReserveResponse(
        boolean success,
        List<Long> failedProductIds
) {}

