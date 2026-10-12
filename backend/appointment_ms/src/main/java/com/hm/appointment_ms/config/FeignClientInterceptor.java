package com.hm.appointment_ms.config;

import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;
import feign.RequestTemplate;

@Configuration 
public class FeignClientInterceptor implements RequestInterceptor {
          
    @Override 
     public void  apply(RequestTemplate template){
        template.header("X-Secret-Key","SECRET");
     }

}
