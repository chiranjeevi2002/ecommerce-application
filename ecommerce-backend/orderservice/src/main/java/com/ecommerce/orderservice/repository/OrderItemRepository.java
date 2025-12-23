package com.ecommerce.orderservice.repository;

import com.ecommerce.orderservice.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderIdAndStoreId(Long orderId, Long storeId);
    void deleteByOrderIdAndStoreId(Long orderId, Long storeId);
}
