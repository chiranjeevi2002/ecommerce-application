package com.ecommerce.common.webflux.webclient;

import java.time.Duration;
public final class WebClientPolicy {

	public static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(3);

	public static final int MAX_RETRIES = 2;

	private WebClientPolicy() {
	}
}
