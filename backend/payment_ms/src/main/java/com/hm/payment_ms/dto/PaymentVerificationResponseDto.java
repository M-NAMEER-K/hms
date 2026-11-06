package com.hm.payment_ms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter 
@AllArgsConstructor
public class PaymentVerificationResponseDto {

    private String message;

    private String paymentStatus;

}