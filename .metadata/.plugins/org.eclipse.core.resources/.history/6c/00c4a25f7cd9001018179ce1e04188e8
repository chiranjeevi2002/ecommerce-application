package com.ecommerce.apigateway.fallback;

import com.ecommerce.apigateway.error.GatewayErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/gateway-fallback")
public class GatewayFallbackController {

    @GetMapping("/**")
    public Mono<ResponseEntity<GatewayErrorResponse>> fallback(ServerWebExchange exchange) {

        String path = exchange.getRequest().getURI().getPath();

        return Mono.just(
                ResponseEntity
                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body(GatewayErrorResponse.serviceUnavailable(path))
        );
    }
}
