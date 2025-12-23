package com.ecommerce.userservice.dto;


import java.util.Set;


public record UserResponse(
        Long id,
        String username,
        String email,
        Long storeId,
        Set<String> roles
        
) {}


