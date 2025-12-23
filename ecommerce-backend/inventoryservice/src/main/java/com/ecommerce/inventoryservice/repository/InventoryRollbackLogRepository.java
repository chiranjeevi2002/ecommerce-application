package com.ecommerce.inventoryservice.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.inventoryservice.model.InventoryRollbackLog;

public interface InventoryRollbackLogRepository
        extends JpaRepository<InventoryRollbackLog, Long> {

    Optional<InventoryRollbackLog> findByOrderIdAndStoreId(Long orderId, Long storeId);
}
