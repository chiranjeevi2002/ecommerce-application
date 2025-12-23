package com.ecommerce.productservice.dto;

import java.time.Instant;
import java.util.List;

public record ProductResponse(
								Long id,
								String name,
								String description,
								Double price,
								Integer quantity,
								Long categoryId,
								String categoryName,
								Long storeId,
								List<String> imageUrls,
								Instant createdAt) {
}
