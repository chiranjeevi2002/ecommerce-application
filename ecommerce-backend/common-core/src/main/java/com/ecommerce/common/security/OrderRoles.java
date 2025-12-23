package com.ecommerce.common.security;

import java.util.Set;

import static com.ecommerce.common.security.Role.*;

public final class OrderRoles {

    private OrderRoles() {}

    public static final Set<String> READ =
            Role.authorities(
                    CUSTOMER,
                    ADMIN,
                    SUPERADMIN,
                    ORDER_MANAGER
            );
    
    public static final Set<String> CREATE =
            Role.authorities(
                    CUSTOMER,
                    ADMIN,
                    SUPERADMIN
            );
    

    public static final Set<String> MANAGE =
            Role.authorities(
                    ADMIN,
                    SUPERADMIN,
                    ORDER_MANAGER
            );

    public static final Set<String> WRITE =
            Role.authorities(
                    ADMIN,
                    SUPERADMIN,
                    ORDER_MANAGER
            );
}
