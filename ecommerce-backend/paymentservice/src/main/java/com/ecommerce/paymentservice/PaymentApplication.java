package com.ecommerce.paymentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.MDC;

@SpringBootApplication
public class PaymentApplication {
    public static void main(String[] args) {
        MDC.put("service","Payment");
        SpringApplication.run(PaymentApplication.class, args);
    }
}
