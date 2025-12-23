package com.ecommerce.common.webflux.security;

import com.ecommerce.common.webflux.context.ReactiveContextHolder;

import reactor.core.publisher.Mono;

public final class SecurityUtil {

    private SecurityUtil() {}

    public static Mono<Boolean> hasRole(String role) {
        return ReactiveContextHolder.get()
                .map(ctx -> ctx.roles().contains(role));
    }
}
