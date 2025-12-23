package com.ecommerce.userservice.service.admin;

import java.util.List;

import com.ecommerce.userservice.dto.RoleSummary;
import com.ecommerce.userservice.dto.UserResponse;

public interface UserAdminService {

	List<UserResponse> listUsers(Integer page, Integer size, String q, Long storeId);

	UserResponse getUser(Long userId);

	UserResponse updateUserRoles(Long userId, List<String> roles, Long storeId);

	List<RoleSummary> listAllRoles();
}
