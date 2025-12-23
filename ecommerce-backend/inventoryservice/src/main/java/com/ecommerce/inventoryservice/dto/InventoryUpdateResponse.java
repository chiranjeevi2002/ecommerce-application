package com.ecommerce.inventoryservice.dto;

 


public record InventoryUpdateResponse(
        Long productId,
        Integer oldQuantity,
        Integer newQuantity,
        Long storeId
) {}

