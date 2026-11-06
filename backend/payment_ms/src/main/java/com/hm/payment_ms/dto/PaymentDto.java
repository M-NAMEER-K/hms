package com.hm.payment_ms.dto;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {


    private Long id;

    private  String  referenceId;

    private String referenceType;

    private Double amount;

    private String currency;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String status;

    private LocalDateTime createdAt;

} 
