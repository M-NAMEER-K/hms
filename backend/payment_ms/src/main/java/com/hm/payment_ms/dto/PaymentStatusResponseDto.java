package com.hm.payment_ms.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter 
@AllArgsConstructor
public class PaymentStatusResponseDto {


    private  String  referenceId;

    private String referenceType;

    private String status;

}