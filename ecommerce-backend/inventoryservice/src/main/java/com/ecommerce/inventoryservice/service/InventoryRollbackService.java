package com.ecommerce.inventoryservice.service;


import com.ecommerce.inventoryservice.dto.InventoryRollbackRequest;
import com.ecommerce.inventoryservice.dto.InventoryRollbackResponse;

public interface InventoryRollbackService {
    InventoryRollbackResponse rollback(InventoryRollbackRequest request);
}
