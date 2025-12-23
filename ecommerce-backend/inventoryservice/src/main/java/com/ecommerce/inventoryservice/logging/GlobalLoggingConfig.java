package com.ecommerce.inventoryservice.logging;

import io.micrometer.tracing.Tracer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


// @Configuration
public class GlobalLoggingConfig {

    @Bean
    public Tracer noopTracer() {
        // Use the Micrometer-provided NOOP tracer. If micrometer-tracing is present,
        // Tracer.NOOP is available and is the correct, stable no-op implementation.
        return Tracer.NOOP;
    }
}
