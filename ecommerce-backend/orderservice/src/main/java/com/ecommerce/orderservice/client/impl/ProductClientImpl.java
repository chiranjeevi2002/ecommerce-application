package com.ecommerce.orderservice.client.impl;

import java.util.List;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.ecommerce.common.security.SecurityConstants;
import com.ecommerce.orderservice.client.ProductClient;
import com.ecommerce.orderservice.dto.ProductResponse;
import com.ecommerce.orderservice.dto.ProductValidationResult;

import reactor.core.publisher.Mono;
@Component
public class ProductClientImpl implements ProductClient {

    private static final String SERVICE = "http://PRODUCTSERVICE";

    private final WebClient webClient;

    public ProductClientImpl(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public Mono<ProductResponse> getById(Long productId, Long storeId) {

        return webClient.get()
                .uri(SERVICE + SecurityConstants.PRODUCTS_BASE + "/{id}", productId)
                .retrieve()
                .onStatus(
                        HttpStatusCode::isError,
                        r -> Mono.error(new IllegalStateException("Product not found"))
                )
                .bodyToMono(ProductResponse.class);
    }

    @Override
    public Mono<Void> validateExists(Long productId, Long storeId) {
        return getById(productId, storeId).then();
    }

    @Override
    public Mono<ProductValidationResult> validateProducts(Long storeId, List<Long> productIds) {

        return webClient.post()
                .uri(SERVICE + SecurityConstants.PRODUCTS_BASE + "/validate")
                .bodyValue(productIds)
                .retrieve()
                .onStatus(
                        HttpStatusCode::isError,
                        r -> r.bodyToMono(String.class)
                              .flatMap(msg -> Mono.error(new IllegalStateException(msg)))
                )
                .bodyToMono(ProductValidationResult.class);
    }
}

