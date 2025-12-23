package com.ecommerce.userservice.dto;


import java.util.Set;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRoleUpdateRequest(
    @NotNull Long userId,
    Long storeId,                  
    @NotNull @Size(min = 1) Set<Long> roleIds
) {}
