package com.ecommerce.userservice.dto;


public record UserListRequest(
    Integer page,
    Integer size,
    String q,               // search query for username/email
    Long storeId            // optional filter by storeId
) {}
