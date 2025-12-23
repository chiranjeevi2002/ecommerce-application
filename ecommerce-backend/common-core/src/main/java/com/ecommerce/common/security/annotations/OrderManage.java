package com.ecommerce.common.security.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("""
	    hasAnyAuthority(
	        T(com.ecommerce.common.security.OrderRoles).MANAGE
	    )
	""")
	public @interface OrderManage {}