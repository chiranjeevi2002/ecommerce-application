package com.ecommerce.productservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.common.security.SecurityConstants;
import com.ecommerce.common.security.annotations.AdminOnly;
import com.ecommerce.productservice.dto.CategoryDTO;
import com.ecommerce.productservice.dto.CategoryResponse;
import com.ecommerce.productservice.service.CategoryService;

import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping(SecurityConstants.PRODUCTS_CATEGORIES_BASE)
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // ---------- Public Read (per store) ----------

    @GetMapping
    public List<CategoryResponse> list(
            @RequestHeader("X-Store-Id") Long storeId) {
        return categoryService.getCategories(storeId);
    }

    @GetMapping("/{id}")
    public CategoryResponse getById(
            @PathVariable Long id,
            @RequestHeader("X-Store-Id") Long storeId) {
        return categoryService.getCategory(id, storeId);
    }

    // ---------- Admin-only Mutations ----------

    @AdminOnly
    @PostMapping
    public ResponseEntity<CategoryResponse> create(
            @RequestHeader("X-Store-Id") Long storeId,
            @Valid @RequestBody CategoryDTO dto) {

        var created = categoryService.createCategory(dto, storeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @AdminOnly
    @PutMapping("/{id}")
    public CategoryResponse update(
            @PathVariable Long id,
            @RequestHeader("X-Store-Id") Long storeId,
            @Valid @RequestBody CategoryDTO dto) {
        return categoryService.updateCategory(id, dto, storeId);
    }

    @AdminOnly
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestHeader("X-Store-Id") Long storeId) {

        categoryService.deleteCategory(id, storeId);
        return ResponseEntity.noContent().build();
    }
}
