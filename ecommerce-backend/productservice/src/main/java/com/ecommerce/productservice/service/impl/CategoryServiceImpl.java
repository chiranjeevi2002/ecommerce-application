package com.ecommerce.productservice.service.impl;

import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.productservice.dto.CategoryDTO;
import com.ecommerce.productservice.dto.CategoryResponse;
import com.ecommerce.productservice.model.Category;
import com.ecommerce.productservice.repository.CategoryRepository;
import com.ecommerce.productservice.service.CategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepo;

    // Reusable mapper Category -> CategoryResponse
    private final Function<Category, CategoryResponse> toResponse =
            c -> new CategoryResponse(c.getId(), c.getName(), c.getDescription(), c.getStoreId());

    public CategoryServiceImpl(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    @Override
    public CategoryResponse createCategory(CategoryDTO dto, Long storeId) {
        var category = new Category();
        category.setName(dto.name());
        category.setDescription(dto.description());
        category.setStoreId(storeId);
        return toResponse.apply(categoryRepo.save(category));
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategory(Long id, Long storeId) {
        var category = categoryRepo
                .findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return toResponse.apply(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories(Long storeId) {
        return categoryRepo.findByStoreId(storeId)
                .stream()
                .map(toResponse)
                .toList();
    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryDTO dto, Long storeId) {
        var category = categoryRepo
                .findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(dto.name());
        category.setDescription(dto.description());

        return toResponse.apply(categoryRepo.save(category));
    }

    @Override
    public void deleteCategory(Long id, Long storeId) {
        var category = categoryRepo
                .findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepo.delete(category);
    }
}
