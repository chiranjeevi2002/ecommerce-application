package com.ecommerce.common.security;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public enum Role {

    SUPERADMIN,
    ADMIN,
    CUSTOMER,
    VENDOR,
    STORE_MANAGER,
    PRODUCT_MANAGER,
    ORDER_MANAGER,
    INVENTORY_MANAGER,
    CUSTOMER_SUPPORT,
    MARKETING_MANAGER,
    FINANCE,
    DEVELOPER,
    GUEST;

    public String authority() {
        return "ROLE_" + name();
    }

    public static Set<String> authorities(Role... roles) {
        return Arrays.stream(roles)
                .map(Role::authority)
                .collect(Collectors.toUnmodifiableSet());
    }
}
