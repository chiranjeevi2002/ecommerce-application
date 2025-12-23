package com.ecommerce.paymentservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.paymentservice.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
	Optional<Payment> findByIdAndStoreId(Long id, Long storeId);

	List<Payment> findByOrderIdAndStoreId(Long orderId, Long storeId);

	List<Payment> findByStoreId(Long storeId);

}
