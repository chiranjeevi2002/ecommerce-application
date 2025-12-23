package com.ecommerce.paymentservice.dto;

import com.ecommerce.paymentservice.enums.PaymentStatus;

public record PaymentDTO(Long orderId, 
		Double amount,
		PaymentStatus status) {
}
