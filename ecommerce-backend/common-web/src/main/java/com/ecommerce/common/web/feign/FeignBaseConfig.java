package com.ecommerce.common.web.feign;

import com.ecommerce.common.context.RequestContext;
import com.ecommerce.common.context.RequestContextHolder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;

@Configuration
public class FeignBaseConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            RequestContext ctx = RequestContextHolder.get();

            template.header("X-User-Id", String.valueOf(ctx.userId()));
            template.header("X-Store-Id", String.valueOf(ctx.storeId()));
            template.header("X-User-Name", ctx.username());
        };
    }
}
