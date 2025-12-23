package com.ecommerce.common.security;

import java.util.Set;

import static com.ecommerce.common.security.Role.*;

public final class UserRoles {

    private UserRoles() {}

    public static final String DEFAULT = CUSTOMER.authority();

    public static final String[] ADMIN_ACCESS = {
        ADMIN.authority(),
        SUPERADMIN.authority(),
        STORE_MANAGER.authority()
    };

    public static final String[] USER_ACCESS = {
        CUSTOMER.authority(),
        ADMIN.authority(),
        SUPERADMIN.authority()
    };

    public static final String[] SUPERADMIN_ONLY = {
        SUPERADMIN.authority()
    };
}

