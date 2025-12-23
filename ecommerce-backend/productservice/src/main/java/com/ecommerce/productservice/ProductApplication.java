package com.ecommerce.productservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.MDC;

@SpringBootApplication
public class ProductApplication {
    public static void main(String[] args) {
        MDC.put("service","Product");
        SpringApplication.run(ProductApplication.class, args);
    }

}
