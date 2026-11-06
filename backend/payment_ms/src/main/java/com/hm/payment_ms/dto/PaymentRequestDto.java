
package com.hm.payment_ms.dto;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PaymentRequestDto {


    private  String  referenceId;


    private String referenceType;


    private Double amount;


}