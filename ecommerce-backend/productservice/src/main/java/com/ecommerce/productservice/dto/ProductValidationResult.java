package com.ecommerce.productservice.dto;


import java.util.List;

public record ProductValidationResult(
        Long storeId,
        List<Long> requestedProductIds,
        List<Long> validProductIds,
        List<Long> invalidProductIds,
        boolean valid
) {
    public static ProductValidationResult of(
            Long storeId,
            List<Long> requestedIds,
            List<Long> validIds
    ) {
        var invalidIds = requestedIds.stream()
                .filter(id -> !validIds.contains(id))
                .toList();

        return new ProductValidationResult(
                storeId,
                requestedIds,
                validIds,
                invalidIds,
                invalidIds.isEmpty()
        );
    }
}
