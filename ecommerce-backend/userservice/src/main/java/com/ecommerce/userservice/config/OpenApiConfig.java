package com.ecommerce.userservice.config;

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
                        .title("Userservice API")
                        .description("Handles authentication, authorization, and user profiles")
                        .version("v1")
                        .contact(
                                new Contact()
                                        .name("Backend Team")
                                        .email("backend-team@example.com")
                        )
        );
    }
}


