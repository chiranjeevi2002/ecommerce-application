package com.ecommerce.inventoryservice.service;

import java.util.List;

import com.ecommerce.inventoryservice.dto.InventoryRequest;
import com.ecommerce.inventoryservice.dto.InventoryReserveRequest;
import com.ecommerce.inventoryservice.dto.InventoryReserveResponse;
import com.ecommerce.inventoryservice.dto.InventoryResponse;
import com.ecommerce.inventoryservice.dto.InventoryUpdateResponse;

public interface InventoryService {

    InventoryResponse createInventory(InventoryRequest request, Long storeId);

    InventoryResponse getInventory(Long id, Long storeId);

    List<InventoryResponse> getAllByStore(Long storeId);

    InventoryUpdateResponse increase(Long productId, Integer qty, Long storeId);

    InventoryUpdateResponse decrease(Long productId, Integer qty, Long storeId);

    void deleteInventory(Long id, Long storeId);

	InventoryReserveResponse reserve(InventoryReserveRequest request);
}
