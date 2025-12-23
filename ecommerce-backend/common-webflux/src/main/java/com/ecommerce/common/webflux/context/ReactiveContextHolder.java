package com.ecommerce.common.webflux.context;

import reactor.core.publisher.Mono;

public final class ReactiveContextHolder {

    public static final String CONTEXT_KEY = "REQUEST_CONTEXT";

    private ReactiveContextHolder() {}

    public static Mono<ReactiveRequestContext> get() {
        return Mono.deferContextual(ctx ->
                Mono.justOrEmpty(ctx.getOrEmpty(CONTEXT_KEY))
        );
    }
}
