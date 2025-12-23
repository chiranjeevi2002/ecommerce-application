package com.ecommerce.common.security.annotations;

import org.springframework.security.access.prepost.PreAuthorize;
import java.lang.annotation.*;

@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("""
    hasAnyAuthority(
        T(com.ecommerce.common.security.Role).CUSTOMER.authority(),
        T(com.ecommerce.common.security.Role).ADMIN.authority(),
        T(com.ecommerce.common.security.Role).SUPERADMIN.authority(),
        T(com.ecommerce.common.security.Role).ORDER_MANAGER.authority()
    )
""")
public @interface OrderCancel {
}
