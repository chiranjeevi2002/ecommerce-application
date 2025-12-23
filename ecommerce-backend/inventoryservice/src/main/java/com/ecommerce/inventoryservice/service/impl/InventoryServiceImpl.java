package com.ecommerce.inventoryservice.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.inventoryservice.dto.InventoryRequest;
import com.ecommerce.inventoryservice.dto.InventoryReserveRequest;
import com.ecommerce.inventoryservice.dto.InventoryReserveResponse;
import com.ecommerce.inventoryservice.dto.InventoryResponse;
import com.ecommerce.inventoryservice.dto.InventoryUpdateResponse;
import com.ecommerce.inventoryservice.model.Inventory;
import com.ecommerce.inventoryservice.repository.InventoryRepository;
import com.ecommerce.inventoryservice.service.InventoryService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryResponse createInventory(InventoryRequest request, Long storeId) {

        Inventory inv = new Inventory();
        inv.setProductId(request.productId());
        inv.setAvailableQuantity(request.quantity());
        inv.setStoreId(storeId);

        Inventory saved = inventoryRepository.save(inv);
        return toResponse(saved);
    }

    @Override
    public InventoryResponse getInventory(Long id, Long storeId) {
        Inventory inv = inventoryRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));
        return toResponse(inv);
    }

    @Override
    public List<InventoryResponse> getAllByStore(Long storeId) {
        return inventoryRepository.findByStoreId(storeId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public InventoryUpdateResponse increase(Long productId, Integer qty, Long storeId) {

        if (qty <= 0) {
            throw new IllegalArgumentException("Increase quantity must be > 0");
        }

        Inventory inv = inventoryRepository.findByProductIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));

        Integer oldQty = inv.getAvailableQuantity();
        inv.setAvailableQuantity(oldQty + qty);
        inventoryRepository.save(inv);

        return new InventoryUpdateResponse(productId, oldQty, inv.getAvailableQuantity(), storeId);
    }

    @Override
    @Transactional
    public InventoryUpdateResponse decrease(Long productId, Integer qty, Long storeId) {

        if (qty <= 0) {
            throw new IllegalArgumentException("Decrease quantity must be > 0");
        }

        Inventory inv = inventoryRepository.findByProductIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));

        Integer oldQty = inv.getAvailableQuantity();

        if (oldQty < qty) {
            throw new IllegalStateException("Insufficient inventory");
        }

        inv.setAvailableQuantity(oldQty - qty);
        inventoryRepository.save(inv);

        return new InventoryUpdateResponse(productId, oldQty, inv.getAvailableQuantity(), storeId);
    }

    @Override
    public void deleteInventory(Long id, Long storeId) {
        Inventory inv = inventoryRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));
        inventoryRepository.delete(inv);
    }

    private InventoryResponse toResponse(Inventory inv) {
        return new InventoryResponse(
                inv.getId(),
                inv.getProductId(),
                inv.getAvailableQuantity(),
                inv.getStoreId(),
                inv.getCreatedAt(),
                inv.getUpdatedAt()
        );
    }
    
    @Override
    @Transactional
    public InventoryReserveResponse reserve(InventoryReserveRequest request) {

        List<Long> failed = new ArrayList<>();

        for (var item : request.items()) {
            int updated = inventoryRepository.decreaseStock(
                    request.storeId(),
                    item.productId(),
                    item.quantity()
            );

            if (updated == 0) {
                failed.add(item.productId());
            }
        }

        if (!failed.isEmpty()) {
            throw new IllegalStateException("Insufficient inventory");
        }

        return new InventoryReserveResponse(true, List.of());
    }
}
