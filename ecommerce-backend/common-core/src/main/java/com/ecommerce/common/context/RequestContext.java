package com.ecommerce.common.context;


import java.util.List;

public record RequestContext(
        Long userId,
        Long storeId,
        String username,
        List<String> roles,
        String authorization
) {
}

