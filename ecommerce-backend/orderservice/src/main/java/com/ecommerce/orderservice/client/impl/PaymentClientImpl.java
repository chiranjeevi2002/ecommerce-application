package com.ecommerce.orderservice.client.impl;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.ecommerce.common.security.SecurityConstants;
import com.ecommerce.orderservice.client.PaymentClient;
import com.ecommerce.orderservice.dto.PaymentRequest;
import com.ecommerce.orderservice.dto.PaymentResponse;

import reactor.core.publisher.Mono;

@Component
public class PaymentClientImpl implements PaymentClient {

	private static final String SERVICE = "http://PAYMENTSERVICE";

	private final WebClient webClient;

	public PaymentClientImpl(WebClient webClient) {
		this.webClient = webClient;
	}

	@Override
	public Mono<PaymentResponse> initiatePayment(Long orderId, Long userId, Double amount, Long storeId) {
		
		// FIXME ONLINE pass dynamically it is online or cash on delivery
		var request = new PaymentRequest(orderId, userId, amount, "ONLINE", storeId);

		return webClient.post().uri(SERVICE + SecurityConstants.PAYMENTS_BASE).bodyValue(request).retrieve()
				.onStatus(HttpStatusCode::isError,
						r -> Mono.error(new IllegalStateException("Payment initiation failed")))
				.bodyToMono(PaymentResponse.class);
	}

	@Override
	public Mono<Void> cancelPayment(Long orderId, Long storeId) {

		return webClient.post().uri(SERVICE + SecurityConstants.PAYMENTS_BASE + "/{orderId}/cancel", orderId).retrieve()
				.onStatus(HttpStatusCode::isError, r -> Mono.error(new IllegalStateException("Payment cancel failed")))
				.bodyToMono(Void.class);
	}
}
