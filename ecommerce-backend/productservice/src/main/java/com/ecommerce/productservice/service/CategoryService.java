package com.ecommerce.productservice.service;

import java.util.List;

import com.ecommerce.productservice.dto.CategoryDTO;
import com.ecommerce.productservice.dto.CategoryResponse;

public interface CategoryService {

    CategoryResponse createCategory(CategoryDTO dto, Long storeId);

    CategoryResponse getCategory(Long id, Long storeId);

    List<CategoryResponse> getCategories(Long storeId);

    CategoryResponse updateCategory(Long id, CategoryDTO dto, Long storeId);

    void deleteCategory(Long id, Long storeId);
}
