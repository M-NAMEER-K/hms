package com.hm.payment_ms.service;

import java.time.LocalDateTime;

import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.hm.payment_ms.config.RazorpayConfig;
import com.hm.payment_ms.dto.PaymentRequestDto;
import com.hm.payment_ms.dto.PaymentResponseDto;
import com.hm.payment_ms.dto.PaymentStatus;
import com.hm.payment_ms.dto.PaymentStatusResponseDto;
import com.hm.payment_ms.entity.Payment;
import com.hm.payment_ms.exception.HmsException;
import com.hm.payment_ms.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;
import com.hm.payment_ms.dto.PaymentVerificationRequestDto;
import com.hm.payment_ms.dto.PaymentVerificationResponseDto;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final RazorpayConfig razorpayConfig;

    @Override
    public PaymentResponseDto createOrder(PaymentRequestDto dto) throws HmsException {

        // Validate Request
        if (dto == null) {
            throw new HmsException("INVALID_PAYMENT_REQUEST", HttpStatus.BAD_REQUEST);
        }

        if (dto.getReferenceId() == null) {
            throw new HmsException("INVALID_REFERENCE_ID", HttpStatus.BAD_REQUEST);
        }

        if (dto.getReferenceType() == null || dto.getReferenceType().isBlank()) {
            throw new HmsException("INVALID_REFERENCE_TYPE", HttpStatus.BAD_REQUEST);
        }

        if (dto.getAmount() == null || dto.getAmount() <= 0) {
            throw new HmsException("INVALID_PAYMENT_AMOUNT", HttpStatus.BAD_REQUEST);
        }

        

        try {

            RazorpayClient razorpayClient =     new RazorpayClient( razorpayConfig.getKeyId(), razorpayConfig.getKeySecret()  );

            JSONObject orderRequest = new JSONObject();

            // Razorpay accepts amount in paise
            int amountInPaise = (int) (dto.getAmount() * 100);

            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put( "receipt",  "receipt_" + dto.getReferenceType() + "_" + dto.getReferenceId() );

            Order order = razorpayClient.orders.create(orderRequest);
            Payment payment = new Payment();
           
            payment.setReferenceId(dto.getReferenceId());
            payment.setReferenceType(dto.getReferenceType());
            payment.setAmount(dto.getAmount());
            payment.setCurrency("INR");
            payment.setRazorpayOrderId(order.get("id"));
            payment.setStatus(PaymentStatus.CREATED);
            payment.setCreatedAt(LocalDateTime.now());
            payment = paymentRepository.save(payment);

            return new PaymentResponseDto(
                    payment.getId(),
                    payment.getRazorpayOrderId(),
                    payment.getAmount(),
                    payment.getCurrency(),
                    payment.getStatus().name()
            );

        } catch (RazorpayException e) {

            e.printStackTrace();

            throw new HmsException( "PAYMENT_CREATION_FAILED", HttpStatus.BAD_REQUEST );
        }
    }

    @Override
    public PaymentVerificationResponseDto verifyPayment(   PaymentVerificationRequestDto dto) throws HmsException {

    Payment payment =  paymentRepository.findByRazorpayOrderId(dto.getRazorpayOrderId())
                         .orElseThrow( () -> new HmsException( "PAYMENT_NOT_FOUND", HttpStatus.NOT_FOUND)  );


    if(payment.getStatus() == PaymentStatus.SUCCESS){
        throw new HmsException( "PAYMENT_ALREADY_COMPLETED",  HttpStatus.CONFLICT );
    }


    try {
         JSONObject options = new JSONObject();
        options.put(  "razorpay_order_id",  dto.getRazorpayOrderId() );
        options.put( "razorpay_payment_id", dto.getRazorpayPaymentId()  );
        options.put( "razorpay_signature", dto.getRazorpaySignature() );

        boolean verification = Utils.verifyPaymentSignature(options,razorpayConfig.getKeySecret()   );

        if(!verification){
            throw new HmsException(  "INVALID_PAYMENT_SIGNATURE", HttpStatus.BAD_REQUEST  );
        }
        payment.setRazorpayPaymentId(  dto.getRazorpayPaymentId() );
        payment.setStatus(PaymentStatus.SUCCESS);
        paymentRepository.save(payment);

        return new PaymentVerificationResponseDto( "Payment Verified Successfully", "SUCCESS" );

    }
    catch(Exception e){
        throw new HmsException( "PAYMENT_VERIFICATION_FAILED", HttpStatus.BAD_REQUEST );

    }


}

@Override
public PaymentStatusResponseDto getPaymentStatus(String referenceType,   String  referenceId) throws HmsException {


    Payment payment =
    paymentRepository.findByReferenceIdAndReferenceType(referenceId , referenceType )
    .orElseThrow(
        () -> new HmsException(
            "PAYMENT_NOT_FOUND",
            HttpStatus.NOT_FOUND
        )
    );


    return new PaymentStatusResponseDto(

        payment.getReferenceId(),

        payment.getReferenceType(),

        payment.getStatus().name()

    );

}

}