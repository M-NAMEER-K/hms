package com.hm.payment_ms.service;


import com.hm.payment_ms.dto.PaymentRequestDto;
import com.hm.payment_ms.dto.PaymentResponseDto;
import com.hm.payment_ms.dto.PaymentStatusResponseDto;
import com.hm.payment_ms.exception.HmsException;

import com.hm.payment_ms.dto.PaymentVerificationRequestDto;
import com.hm.payment_ms.dto.PaymentVerificationResponseDto;


public interface PaymentService {


    PaymentResponseDto createOrder(PaymentRequestDto dto) throws HmsException;
    PaymentVerificationResponseDto verifyPayment( PaymentVerificationRequestDto dto) throws HmsException;
    PaymentStatusResponseDto getPaymentStatus(String referenceType,  String  referenceId ) throws HmsException; 

}