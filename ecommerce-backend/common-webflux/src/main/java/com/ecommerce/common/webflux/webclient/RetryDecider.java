package com.ecommerce.common.webflux.webclient;


import org.springframework.web.reactive.function.client.WebClientResponseException;

public final class RetryDecider {

    private RetryDecider() {
    }

    public static boolean shouldRetry(Throwable error) {

        if (error instanceof WebClientResponseException ex) {
            int status = ex.getStatusCode().value();
            return status >= 500;
        }

        return true;
    }
}
