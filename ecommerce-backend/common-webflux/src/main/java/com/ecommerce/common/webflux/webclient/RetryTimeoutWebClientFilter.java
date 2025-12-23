package com.ecommerce.common.webflux.webclient;


import java.time.Duration;

import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;

import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

public final class RetryTimeoutWebClientFilter {

	private RetryTimeoutWebClientFilter() {
	}

	public static ExchangeFilterFunction apply() {

		return (request, next) -> {

			Mono<ClientResponse> response = next.exchange(request);

			return response.timeout(WebClientPolicy.REQUEST_TIMEOUT).retryWhen(buildRetrySpec());
		};
	}

	private static Retry buildRetrySpec() {

		return Retry.fixedDelay(WebClientPolicy.MAX_RETRIES, Duration.ofMillis(300)).filter(RetryDecider::shouldRetry);
	}
}
