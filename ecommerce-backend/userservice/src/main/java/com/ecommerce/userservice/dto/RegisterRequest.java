package com.ecommerce.userservice.dto;


import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank String username,
    @NotBlank @Size(min = 6) String password,
    @NotBlank @Email String email,
    Set<String> roles,
    Long storeId

) {}

