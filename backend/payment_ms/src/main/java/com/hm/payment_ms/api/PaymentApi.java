package com.hm.payment_ms.api;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hm.payment_ms.dto.PaymentRequestDto;
import com.hm.payment_ms.dto.PaymentResponseDto;
import com.hm.payment_ms.dto.PaymentStatusResponseDto;
import com.hm.payment_ms.service.PaymentService;


import lombok.RequiredArgsConstructor;
import com.hm.payment_ms.dto.PaymentVerificationRequestDto;
import com.hm.payment_ms.dto.PaymentVerificationResponseDto;
import com.hm.payment_ms.exception.HmsException;



@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentApi {


    private final PaymentService paymentService;

@GetMapping("/status/{referenceType}/{referenceId}")
public ResponseEntity<PaymentStatusResponseDto> getPaymentStatus( @PathVariable String referenceType ,@PathVariable  String  referenceId) throws HmsException{


return new ResponseEntity<>(paymentService.getPaymentStatus(referenceType , referenceId),HttpStatus.OK);


}

    @PostMapping("/create-order")
    public ResponseEntity<PaymentResponseDto> createOrder(  @RequestBody PaymentRequestDto dto ) throws HmsException{

        return new ResponseEntity<>( paymentService.createOrder(dto), HttpStatus.CREATED );

    }

    @PostMapping("/verify")
public ResponseEntity<PaymentVerificationResponseDto> verifyPayment(  @RequestBody PaymentVerificationRequestDto dto)throws HmsException{

    return new ResponseEntity<>( paymentService.verifyPayment(dto), HttpStatus.OK );
}

}