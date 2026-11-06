package com.hm.payment_ms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVerificationRequestDto {

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

}