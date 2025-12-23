package com.ecommerce.inventoryservice.logging;

import io.micrometer.tracing.Tracer;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

// @Component
public class AdvancedMdcFilter extends OncePerRequestFilter {

    private final Tracer tracer;

    @Value("${spring.application.name}")
    private String serviceName;

    public AdvancedMdcFilter(Tracer tracer) {
        this.tracer = tracer;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain
    ) throws ServletException, IOException {

        try {
            MDC.put(MdcKeys.REQUEST_ID, UUID.randomUUID().toString());
            MDC.put(MdcKeys.SERVICE, serviceName);

            var span = tracer.currentSpan();
            if (span != null && span.context() != null) {
                MDC.put(MdcKeys.TRACE_ID, span.context().traceId());
                MDC.put(MdcKeys.SPAN_ID, span.context().spanId());
            }

            String userId = req.getHeader("X-User-Id");
            if (userId != null) MDC.put(MdcKeys.USER_ID, userId);

            MDC.put(MdcKeys.IP, req.getRemoteAddr());
            MDC.put(MdcKeys.METHOD, req.getMethod());
            MDC.put(MdcKeys.PATH, req.getRequestURI());

            chain.doFilter(req, res);

        } finally {
            MDC.clear();
        }
    }
}
