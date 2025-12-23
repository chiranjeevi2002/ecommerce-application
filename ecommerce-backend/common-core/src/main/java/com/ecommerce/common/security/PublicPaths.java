package com.ecommerce.common.security;

public final class PublicPaths {

    private PublicPaths() {}

    public static final String[] GATEWAY = {
        SecurityConstants.AUTH,
        SecurityConstants.PRODUCTS,
        SecurityConstants.UPLOADS,
        SecurityConstants.ACTUATOR,
        "/v3/api-docs/**",
        "/api/v1/docs"
    };

    public static final String[] USER_SERVICE = {
        SecurityConstants.AUTH,
        SecurityConstants.ACTUATOR,
        "/v3/api-docs/**"
    };

    public static final String[] PRODUCT_SERVICE = {
        SecurityConstants.PRODUCTS,
        SecurityConstants.UPLOADS,
        SecurityConstants.ACTUATOR,
        "/v3/api-docs/**"
    };

    public static final String[] ORDER_SERVICE = {
        SecurityConstants.ACTUATOR,
        "/v3/api-docs/**"
    };

    public static final String[] INVENTORY_SERVICE = {
        SecurityConstants.ACTUATOR,
        "/v3/api-docs/**"
    };

    public static final String[] PAYMENT_SERVICE = {
        SecurityConstants.ACTUATOR,
        "/v3/api-docs/**"
    };
}

