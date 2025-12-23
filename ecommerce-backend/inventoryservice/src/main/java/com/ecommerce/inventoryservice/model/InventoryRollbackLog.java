package com.ecommerce.inventoryservice.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
@Table(
    name = "inventory_rollback_log",
    uniqueConstraints = @UniqueConstraint(columnNames = {"order_id", "store_id"})
)
public class InventoryRollbackLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "store_id", nullable = false)
    private Long storeId;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}

