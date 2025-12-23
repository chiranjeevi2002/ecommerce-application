package com.ecommerce.paymentservice.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.paymentservice.dto.PaymentRequest;
import com.ecommerce.paymentservice.dto.PaymentResponse;
import com.ecommerce.paymentservice.enums.PaymentStatus;
import com.ecommerce.paymentservice.model.Payment;
import com.ecommerce.paymentservice.repository.PaymentRepository;
import com.ecommerce.paymentservice.service.PaymentService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // ---------------------------
    // CREATE PAYMENT
    // ---------------------------
    @Override
    public PaymentResponse createPayment(PaymentRequest request,Long storeId) {

        Payment payment = new Payment();
        payment.setOrderId(request.orderId());
        payment.setStoreId(storeId);   // assign tenant

        payment.setUserId(request.userId());
        payment.setAmount(request.amount());
        payment.setStatus(PaymentStatus.PENDING);

        // Generate transaction ID
        payment.setTransactionId(UUID.randomUUID().toString());

        // Simulate real payment logic
        boolean paymentSuccess = request.amount() != null && request.amount() > 0;

        if (paymentSuccess) {
            payment.setStatus(PaymentStatus.COMPLETED);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }

        Payment saved = paymentRepository.save(payment);

        return new PaymentResponse(
                saved.getId(),
                saved.getOrderId(),
                saved.getUserId(),
                saved.getAmount(),
                saved.getStatus(),
                saved.getTransactionId(),
                saved.getCreatedAt(),
                saved.getStatus() == PaymentStatus.COMPLETED ?
                        "Payment successful" : "Payment failed"
        );
    }

    // ---------------------------
    // GET PAYMENT BY ID
    // ---------------------------
    @Override
    public PaymentResponse getPaymentById(Long id,Long storeId) {
        Payment payment = paymentRepository.findByIdAndStoreId(id,storeId)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));

        return new PaymentResponse(
                payment.getId(),
                payment.getOrderId(),
                payment.getUserId(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getTransactionId(),
                payment.getCreatedAt(),
                null
        );
    }

    // ---------------------------
    // GET ALL PAYMENTS
    // ---------------------------
    @Override
    public List<PaymentResponse> getPaymentsByStore(Long storeId) {
        return paymentRepository.findByStoreId(storeId)
                .stream()
                .map(p -> new PaymentResponse(
                        p.getId(),
                        p.getOrderId(),
                        p.getUserId(),
                        p.getAmount(),
                        p.getStatus(),
                        p.getTransactionId(),
                        p.getCreatedAt(),
                        null
                ))
                .collect(Collectors.toList());
    }

    // ---------------------------
    // UPDATE PAYMENT
    // ---------------------------
    @Override
    public PaymentResponse updatePayment(Long id,Long storeId, PaymentRequest request) {

        Payment payment = paymentRepository.findByIdAndStoreId(id,storeId)
                .orElseThrow(() -> new RuntimeException("Payment not found for this store with ID: %s and Store ID: %s".formatted(id, storeId)));

        payment.setOrderId(request.orderId());
        payment.setUserId(request.userId());
        payment.setAmount(request.amount());

        boolean paymentSuccess = request.amount() != null && request.amount() > 0;
        payment.setStatus(paymentSuccess ? PaymentStatus.COMPLETED : PaymentStatus.FAILED);

        Payment saved = paymentRepository.save(payment);

        return new PaymentResponse(
                saved.getId(),
                saved.getOrderId(),
                saved.getUserId(),
                saved.getAmount(),
                saved.getStatus(),
                saved.getTransactionId(),
                saved.getCreatedAt(),
                paymentSuccess ? "Updated: Payment successful" : "Updated: Payment failed"
        );
    }

    // ---------------------------
    // DELETE PAYMENT
    // ---------------------------
    @Override
    public void deletePayment(Long id, Long storeId) {
        Payment payment = paymentRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new RuntimeException("Payment not found for this store with ID: %s and Store ID: %s".formatted(id, storeId)));
        paymentRepository.delete(payment);
    }
}
