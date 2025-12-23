package com.ecommerce.common.webflux.webclient;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientFactory {

    /**
     * Load-balanced WebClient builder.
     * Enables service-to-service calls using logical service names
     * http://inventoryservice
     * http://orderservice
     */
    @Bean
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }

    /**
     * Central WebClient used across all WebFlux services.
     *
     * Features:
     *   Spring Cloud LoadBalancer
     *   Automatic request context propagation
     *   Retry and timeout policy
     */
    @Bean
    public WebClient webClient(WebClient.Builder builder) {

        return builder
                .filter(RequestContextWebClientFilter.propagateContext())
                .filter(RetryTimeoutWebClientFilter.apply())
                .build();
    }
}
