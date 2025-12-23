package com.ecommerce.common.context;

public final class RequestContextHolder {

    private static final ThreadLocal<RequestContext> HOLDER = new ThreadLocal<>();

    private RequestContextHolder() {}

    public static void set(RequestContext context) {
        HOLDER.set(context);
    }

    public static RequestContext get() {
        RequestContext ctx = HOLDER.get();
        if (ctx == null) {
            throw new IllegalStateException("RequestContext not available");
        }
        return ctx;
    }

    public static void clear() {
        HOLDER.remove();
    }
}
