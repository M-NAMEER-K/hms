package com.hm.payment_ms.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class PaymentResponseDto {


    private Long paymentId;

    private String razorpayOrderId;

    private Double amount;

    private String currency;

    private String status;

}