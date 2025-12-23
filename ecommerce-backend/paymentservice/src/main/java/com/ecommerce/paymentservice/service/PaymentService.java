package com.ecommerce.paymentservice.service;

import java.util.List;

import com.ecommerce.paymentservice.dto.PaymentRequest;
import com.ecommerce.paymentservice.dto.PaymentResponse;

public interface PaymentService {

    PaymentResponse createPayment(PaymentRequest request, Long storeId);

    PaymentResponse getPaymentById(Long id,Long storeId);

    List<PaymentResponse> getPaymentsByStore(Long storeId);

    PaymentResponse updatePayment(Long id,Long storeId, PaymentRequest request);

    void deletePayment(Long id,Long storeId);
}
