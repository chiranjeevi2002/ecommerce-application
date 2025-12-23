package com.ecommerce.orderservice.logging;

import io.micrometer.tracing.Tracer;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.UUID;

//@Component
public class ReactiveMdcFilter implements WebFilter {

    private final Tracer tracer;

    public ReactiveMdcFilter(Tracer tracer) {
        this.tracer = tracer;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        // Generate Request Id
        MDC.put("reqId", UUID.randomUUID().toString());

        // Add Trace/Span IDs if present
        var span = tracer.currentSpan();
        if (span != null) {
            MDC.put("traceId", span.context().traceId());
            MDC.put("spanId", span.context().spanId());
        }

        MDC.put("method", exchange.getRequest().getMethod().name());
        MDC.put("path", exchange.getRequest().getURI().toString());

        return chain.filter(exchange)
                .doFinally(signalType -> MDC.clear());
    }
}
