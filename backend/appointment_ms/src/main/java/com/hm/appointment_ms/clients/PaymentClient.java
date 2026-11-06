package com.hm.appointment_ms.clients;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import com.hm.appointment_ms.config.FeignClientInterceptor;
import com.hm.appointment_ms.config.FeignErrorDecoder;
import com.hm.appointment_ms.dto.PaymentStatusResponseDto;


@FeignClient(name="payment-ms",url="${payment-ms.url}",configuration={FeignClientInterceptor.class,FeignErrorDecoder.class})
public interface PaymentClient {
     @GetMapping("/payment/status/{referenceType}/{referenceId}")
     PaymentStatusResponseDto getPaymentStatus(@PathVariable String referenceType , @PathVariable String referenceId);
}