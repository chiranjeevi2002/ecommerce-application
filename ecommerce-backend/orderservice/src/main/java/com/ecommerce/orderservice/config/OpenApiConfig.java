package com.ecommerce.orderservice.config;

import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenApiCustomizer customizeOpenApi() {
        return openApi -> openApi.info(
                new Info()
                        .title("Orderservice API")
                        .description("Order workflow microservice: validate, reserve, pay, complete")
                        .version("v1")
                        .contact(new Contact().name("Backend Team").email("backend-team@example.com"))
        );
    }
}
