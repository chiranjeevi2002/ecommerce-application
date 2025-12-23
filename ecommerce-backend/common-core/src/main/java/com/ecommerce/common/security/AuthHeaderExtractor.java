package com.ecommerce.common.security;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public final class AuthHeaderExtractor {

    private AuthHeaderExtractor() {}

    public static Set<String> extractRoles(String rolesHeader) {
        if (rolesHeader == null || rolesHeader.isBlank()) {
            return Set.of();
        }
        return Arrays.stream(rolesHeader.split(","))
                .map(String::trim)
                .collect(Collectors.toSet());
    }
}
