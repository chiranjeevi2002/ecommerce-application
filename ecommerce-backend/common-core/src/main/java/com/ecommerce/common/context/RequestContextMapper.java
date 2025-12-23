package com.ecommerce.common.context;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public final class RequestContextMapper {

    private RequestContextMapper() {}

    public static RequestContext fromHeaders(
            String userId,
            String storeId,
            String username,
            String roles,
            String authorization
    ) {
        return new RequestContext(
                parseLong(userId),
                parseLong(storeId),
                username,
                parseRoles(roles),
                authorization
        );
    }

    private static Long parseLong(String value) {
    try {
        return value == null ? null : Long.valueOf(value);
    } catch (NumberFormatException ex) {
        return null;
    }
}


    
    private static List<String> parseRoles(String roles) {
        if (roles == null || roles.isBlank()) {
            return List.of();
        }
        return Arrays.stream(roles.split(",")).map(String::trim).toList();
    }

}
