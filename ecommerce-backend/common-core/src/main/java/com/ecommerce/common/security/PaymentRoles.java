package com.ecommerce.common.security;

import java.util.Set;

import static com.ecommerce.common.security.Role.*;

public final class PaymentRoles {

    private PaymentRoles() {}

    public static final Set<String> ACCESS =
            Role.authorities(
                    ADMIN,
                    SUPERADMIN,
                    FINANCE
            );
}
