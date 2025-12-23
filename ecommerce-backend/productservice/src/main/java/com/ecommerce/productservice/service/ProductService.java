package com.ecommerce.productservice.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ecommerce.productservice.dto.ProductDTO;
import com.ecommerce.productservice.dto.ProductResponse;
import com.ecommerce.productservice.dto.ProductValidationResult;

public interface ProductService {

	ProductResponse createProduct(ProductDTO dto, Long storeId);

	ProductResponse getProduct(Long id, Long storeId);

	List<ProductResponse> getProductsByStore(Long storeId);

	ProductResponse updateProduct(Long id, ProductDTO dto, Long storeId);

	void deleteProduct(Long id, Long storeId);

	Page<ProductResponse> getProductsByStore(Long storeId, int page, int size, String sortBy, String direction);

	Page<ProductResponse> searchProducts(Long storeId, String keyword, int page, int size, String sortBy,
			String direction);

	ProductValidationResult validateProducts(Long storeId, List<Long> productIds);
}
