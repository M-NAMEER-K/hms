package com.hm.appointment_ms.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class PaymentStatusResponseDto {


    private String referenceId;

    private String referenceType;

    private String status;

}