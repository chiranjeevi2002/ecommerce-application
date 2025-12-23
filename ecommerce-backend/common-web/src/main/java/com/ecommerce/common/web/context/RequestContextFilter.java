package com.ecommerce.common.web.context;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import com.ecommerce.common.context.RequestContext;
import com.ecommerce.common.context.RequestContextHolder;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class RequestContextFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            RequestContext context = new RequestContext(
                    parseLong(request.getHeader("X-User-Id")),
                    parseLong(request.getHeader("X-Store-Id")),
                    request.getHeader("X-User-Name"),
                    parseRoles(request.getHeader("X-User-Roles")),
                    request.getHeader("Authorization")
            );

            RequestContextHolder.set(context);
            filterChain.doFilter(request, response);

        } finally {
            RequestContextHolder.clear();
        }
    }

    private Long parseLong(String value) {
        try {
            return value == null ? null : Long.valueOf(value);
        } catch (NumberFormatException ex) {
            return null;
        }
    }

    private List<String> parseRoles(String rolesHeader) {
        if (rolesHeader == null || rolesHeader.isBlank()) {
            return List.of();
        }
        return Arrays.stream(rolesHeader.split(","))
                .map(String::trim)
                .toList();
    }
}
