package com.ecommerce.common.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(
    name = "stores",
    indexes = {
        @Index(name = "idx_store_code", columnList = "code")
    }
)
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code; // e.g. "flowers", "medcare"

    private String name;

    private String brandingConfigPath;

    @Column(columnDefinition = "TEXT")
    private String featureFlags; // optional JSON

    private String defaultLocale;

    private String defaultCurrency;

    private boolean active = true;
}