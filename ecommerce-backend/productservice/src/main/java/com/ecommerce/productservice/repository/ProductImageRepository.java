package com.ecommerce.productservice.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.productservice.model.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    void deleteByProductId(Long productId);
}
