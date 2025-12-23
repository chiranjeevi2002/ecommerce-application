package com.ecommerce.orderservice.client;

import java.util.List;

import com.ecommerce.orderservice.dto.ProductResponse;
import com.ecommerce.orderservice.dto.ProductValidationResult;

import reactor.core.publisher.Mono;

public interface ProductClient {

	Mono<ProductResponse> getById(Long productId, Long storeId);

	Mono<Void> validateExists(Long productId, Long storeId);

	Mono<ProductValidationResult> validateProducts(Long storeId, List<Long> productIds );
}
