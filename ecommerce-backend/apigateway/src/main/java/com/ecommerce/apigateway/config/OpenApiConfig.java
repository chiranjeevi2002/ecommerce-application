package com.ecommerce.apigateway.config;


import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenApiCustomizer gatewayOpenApi() {
        return openApi -> openApi.info(
                new Info()
                        .title("API Gateway")
                        .version("v1")
                        .description("Unified API endpoint and Swagger aggregation")
        );
    }
}

