package com.ecommerce.apigateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.ecommerce.common.context.RequestHeaders;
import com.ecommerce.common.security.AuthHeaderExtractor;

import reactor.core.publisher.Mono;

@Component
public class GatewayHeaderAuthenticationWebFilter implements WebFilter {

    @Override
    public Mono<Void> filter(@NonNull ServerWebExchange exchange,
                             @NonNull WebFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();

        String userId = request.getHeaders().getFirst(RequestHeaders.USER_ID);
        String username = request.getHeaders().getFirst(RequestHeaders.USERNAME);
        String roles = request.getHeaders().getFirst(RequestHeaders.USER_ROLES);

        if (userId == null || username == null || roles == null) {
            return chain.filter(exchange);
        }

        var authorities = AuthHeaderExtractor.extractRoles(roles)
                .stream()
                .map(SimpleGrantedAuthority::new)
                .toList();

        var authentication =
                new UsernamePasswordAuthenticationToken(username, null, authorities);

        return chain.filter(exchange)
                .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
    }
}
