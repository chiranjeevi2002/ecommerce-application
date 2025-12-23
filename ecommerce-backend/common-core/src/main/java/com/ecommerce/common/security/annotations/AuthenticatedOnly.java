package com.ecommerce.common.security.annotations;


import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("""
    isAuthenticated() and
    hasAuthority(T(com.ecommerce.common.security.Role).CUSTOMER.authority())
""")

public @interface AuthenticatedOnly {
}

