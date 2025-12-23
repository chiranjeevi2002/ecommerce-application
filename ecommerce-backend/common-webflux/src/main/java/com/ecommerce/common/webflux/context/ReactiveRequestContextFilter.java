package com.ecommerce.common.webflux.context;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

@Component
public class ReactiveRequestContextFilter implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();
                
        ReactiveRequestContext context = new ReactiveRequestContext(
                parseLong(request.getHeaders().getFirst("X-User-Id")),
                parseLong(request.getHeaders().getFirst("X-Store-Id")),
                request.getHeaders().getFirst("X-User-Name"),
                parseRoles(request.getHeaders().getFirst("X-User-Roles")),
                request.getHeaders().getFirst("Authorization"),
                request.getHeaders().getFirst("X-Trace-Id")
                
        );

        return chain.filter(exchange)
                .contextWrite(ctx -> ctx.put(ReactiveContextHolder.CONTEXT_KEY, context));
    }

    private Long parseLong(String value) {
        try {
            return value == null ? null : Long.valueOf(value);
        } catch (NumberFormatException ex) {
            return null;
        }
    }

    private List<String> parseRoles(String roles) {
        if (roles == null || roles.isBlank()) {
            return List.of();
        }
        return Arrays.stream(roles.split(","))
                .map(String::trim)
                .toList();
    }
}
