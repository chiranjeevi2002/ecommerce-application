package com.ecommerce.inventoryservice.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecommerce.common.security.SecurityHeaders;
import com.ecommerce.common.store.StoreContextHolder;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class StoreContextFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String storeIdHeader = request.getHeader(SecurityHeaders.STORE_ID);

        if (storeIdHeader != null) {
            StoreContextHolder.set(Long.valueOf(storeIdHeader));
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            StoreContextHolder.clear();
        }
    }
}

