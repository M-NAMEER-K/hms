package com.hm.payment_ms.entity;

import java.time.LocalDateTime;

import com.hm.payment_ms.dto.PaymentDto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.hm.payment_ms.dto.PaymentStatus;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Payment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

  
    private  String  referenceId;

    private String referenceType;

    private Double amount;

    private String currency;

    private String razorpayOrderId;

    private String razorpayPaymentId;

     @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    

    private LocalDateTime createdAt;

   public PaymentDto toDto(){

    return new PaymentDto(
        id,
        referenceId,
        referenceType,
        amount,
        currency,
        razorpayOrderId,
        razorpayPaymentId,
        status.name(),
        createdAt
    );
}
}