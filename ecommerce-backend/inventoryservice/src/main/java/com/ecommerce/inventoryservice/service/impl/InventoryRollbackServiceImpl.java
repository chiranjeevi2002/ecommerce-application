package com.ecommerce.inventoryservice.service.impl;

import java.time.Instant;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.inventoryservice.dto.InventoryRollbackRequest;
import com.ecommerce.inventoryservice.dto.InventoryRollbackResponse;
import com.ecommerce.inventoryservice.model.InventoryRollbackLog;
import com.ecommerce.inventoryservice.repository.InventoryRepository;
import com.ecommerce.inventoryservice.repository.InventoryRollbackLogRepository;
import com.ecommerce.inventoryservice.service.InventoryRollbackService;

@Service
@Transactional
public class InventoryRollbackServiceImpl implements InventoryRollbackService {

    private final InventoryRepository inventoryRepository;
    private final InventoryRollbackLogRepository rollbackLogRepository;

    public InventoryRollbackServiceImpl(
            InventoryRepository inventoryRepository,
            InventoryRollbackLogRepository rollbackLogRepository
    ) {
        this.inventoryRepository = inventoryRepository;
        this.rollbackLogRepository = rollbackLogRepository;
    }

    @Override
    public InventoryRollbackResponse rollback(InventoryRollbackRequest request) {

        rollbackLogRepository
                .findByOrderIdAndStoreId(request.orderId(), request.storeId())
                .ifPresent(log -> {
                    throw new IllegalStateException(
                            "Rollback already executed for order " + request.orderId()
                    );
                });

        var restored = new ArrayList<Long>();
        var skipped = new ArrayList<Long>();

        for (var item : request.items()) {

            if (item.quantity() == null || item.quantity() <= 0) {
                skipped.add(item.productId());
                continue;
            }

            int updated = inventoryRepository.increaseStock(
                    request.storeId(),
                    item.productId(),
                    item.quantity()
            );

            if (updated > 0) {
                restored.add(item.productId());
            } else {
                skipped.add(item.productId());
            }
        }

        var log = new InventoryRollbackLog();
        log.setOrderId(request.orderId());
        log.setStoreId(request.storeId());
        rollbackLogRepository.save(log);

        return new InventoryRollbackResponse(
                request.orderId(),
                request.storeId(),
                true,
                restored,
                skipped,
                Instant.now()
        );
    }
}
