package com.ecommerce.common.security;

import java.util.Set;

import static com.ecommerce.common.security.Role.*;

public final class InventoryRoles {

    private InventoryRoles() {}

    public static final Set<String> ACCESS =
            Role.authorities(
                    ADMIN,
                    SUPERADMIN,
                    INVENTORY_MANAGER
            );
}
