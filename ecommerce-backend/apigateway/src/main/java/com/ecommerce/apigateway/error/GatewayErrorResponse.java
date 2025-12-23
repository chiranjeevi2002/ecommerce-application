package com.ecommerce.apigateway.error;

import java.time.Instant;

public record GatewayErrorResponse(
        String code,
        String message,
        int httpStatus,
        Instant timestamp,
        String path
) {

    public static GatewayErrorResponse unauthorized(String path) {
        return new GatewayErrorResponse(
                "GATEWAY_UNAUTHORIZED",
                "Unauthorized request",
                401,
                Instant.now(),
                path
        );
    }

    public static GatewayErrorResponse forbidden(String path) {
        return new GatewayErrorResponse(
                "GATEWAY_FORBIDDEN",
                "Access denied",
                403,
                Instant.now(),
                path
        );
    }

    public static GatewayErrorResponse serviceUnavailable(String path) {
        return new GatewayErrorResponse(
                "SERVICE_UNAVAILABLE",
                "Service temporarily unavailable",
                503,
                Instant.now(),
                path
        );
    }
}
