package com.ecommerce.common.store;

public final class StoreContextHolder {

    private static final ThreadLocal<Long> STORE_ID = new ThreadLocal<>();

    private StoreContextHolder() {}

    public static void set(Long storeId) {
        STORE_ID.set(storeId);
    }

    public static Long get() {
        return STORE_ID.get();
    }

    public static void clear() {
        STORE_ID.remove();
    }
}
