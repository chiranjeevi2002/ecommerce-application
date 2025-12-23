package com.ecommerce.common.security;

public final class SecurityConstants {

    private SecurityConstants() {}

    public static final String API_V1 = "/api/v1";

    // Base paths (NO wildcards)
    public static final String AUTH_BASE = API_V1 + "/auth";
    public static final String USERS_BASE = API_V1 + "/users";
    public static final String PRODUCTS_BASE = API_V1 + "/products";
    public static final String ORDERS_BASE = API_V1 + "/orders";
    public static final String INVENTORY_BASE = API_V1 + "/inventory";
    public static final String PAYMENTS_BASE = API_V1 + "/payments";
    public static final String ADMIN_BASE = API_V1 + "/admin";

    public static final String ADMIN_USERS_BASE = API_V1 + "/admin/users";
    public static final String ADMIN_PRODUCTS_BASE = API_V1 + "/admin/products";

    // Wildcard patterns (for gateway / security)
    public static final String AUTH = AUTH_BASE + "/**";
    public static final String PRODUCTS = PRODUCTS_BASE + "/**";
    public static final String ORDERS = ORDERS_BASE + "/**";
    public static final String INVENTORY = INVENTORY_BASE + "/**";
    public static final String PAYMENTS = PAYMENTS_BASE + "/**";
    public static final String ADMIN = ADMIN_BASE + "/**";

    public static final String UPLOADS_BASE = "/uploads";
    public static final String UPLOADS = UPLOADS_BASE + "/**";

    public static final String ACTUATOR = "/actuator/**";
    public static final String ADMIN_USERS = API_V1 + "/admin/users/**";
    public static final String ADMIN_PRODUCTS = API_V1 + "/admin/products/**";

  
}

