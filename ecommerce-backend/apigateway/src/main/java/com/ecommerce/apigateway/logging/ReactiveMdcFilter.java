package com.ecommerce.apigateway.logging;

import io.micrometer.tracing.Tracer;
import org.slf4j.MDC;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
// import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

// @Component
public class ReactiveMdcFilter implements GlobalFilter, Ordered {

    private final Tracer tracer;

    public ReactiveMdcFilter(Tracer tracer) {
        this.tracer = tracer;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {

        String requestId = UUID.randomUUID().toString();
        MDC.put("reqId", requestId);

        // var span = tracer.currentSpan();
        // if (span != null && span.context() != null) {
        //    
        //    
        //     MDC.put("traceId", span.context().traceId() != null ? span.context().traceId() : "N/A");
        //     MDC.put("spanId", span.context().spanId() != null ? span.context().spanId() : "N/A");
        // } else {
        //     MDC.put("traceId", "N/A");
        //     MDC.put("spanId", "N/A");
        // }
        MDC.put("traceId", "N/A");
            MDC.put("spanId", "N/A");
        MDC.put("method", exchange.getRequest().getMethod().name());
        MDC.put("path", exchange.getRequest().getURI().getPath());

        return chain.filter(exchange)
                .doFinally(signalType -> MDC.clear());
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
