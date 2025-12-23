package com.ecommerce.common.context;

public final class RequestHeaders {

	private RequestHeaders() {
	}

	public static final String USER_ID = "X-User-Id";
	public static final String STORE_ID = "X-Store-Id";
	public static final String USERNAME = "X-User-Name";
	public static final String USER_ROLES = "X-User-Roles";
	public static final String AUTHORIZATION = "Authorization";
	public static final String TRACE_ID = "X-Trace-Id";

}
