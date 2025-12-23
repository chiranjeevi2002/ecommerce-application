package com.ecommerce.paymentservice.config;


import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenApiCustomizer customizeOpenApi() {
        return openApi -> openApi.info(
                new Info()
                        .title("Paymentservice API")
                        .description("Payment creation, status handling, and integration points")
                        .version("v1")
                        .contact(new Contact().name("Backend Team").email("backend-team@example.com"))
        );
    }
}

