package com.ecommerce.common.security.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("""
    hasAnyAuthority(
        T(com.ecommerce.common.security.UserRoles).ADMIN_ACCESS
    )
""")
public @interface AdminOnly {
}
