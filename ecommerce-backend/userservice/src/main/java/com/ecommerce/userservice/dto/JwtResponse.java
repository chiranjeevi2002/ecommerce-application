package com.ecommerce.userservice.dto;

import java.util.Set;

public record JwtResponse(
        String token,
        String tokenType,
        Long expiresInMillis,
        Long storeId,
        Long userId,
        String username,
        Set<String> roles
) {}
