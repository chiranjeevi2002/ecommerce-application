package com.ecommerce.common.security;

import java.util.Set;

import static com.ecommerce.common.security.Role.*;

public final class ProductRoles {

    private ProductRoles() {}

    public static final Set<String> READ =
            Role.authorities(
                    CUSTOMER,
                    ADMIN,
                    SUPERADMIN,
                    PRODUCT_MANAGER,
                    GUEST
            );

    public static final Set<String> WRITE =
            Role.authorities(
                    ADMIN,
                    SUPERADMIN,
                    PRODUCT_MANAGER
            );
}
