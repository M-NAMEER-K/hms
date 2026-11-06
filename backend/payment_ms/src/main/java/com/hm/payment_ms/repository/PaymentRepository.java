package com.hm.payment_ms.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hm.payment_ms.entity.Payment;


public interface PaymentRepository extends JpaRepository<Payment,Long>{

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    Optional<Payment> findByReferenceIdAndReferenceType(   String  referenceId,  String referenceType);

}