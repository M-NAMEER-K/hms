package com.hm.appointment_ms.config;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hm.appointment_ms.dto.ErrorResponseDto;
import com.hm.appointment_ms.exception.HmsException;

import feign.Response;
import feign.codec.ErrorDecoder;


public class FeignErrorDecoder implements ErrorDecoder {

    private ObjectMapper mapper = new ObjectMapper();


 @Override
public Exception decode(String methodKey, Response response) {

    try {

        ErrorResponseDto error = mapper.readValue( response.body().asInputStream(), ErrorResponseDto.class );


        return new HmsException(  error.getErrorMessage(),  HttpStatus.valueOf(error.getErrorCode())  );


    } catch(Exception e){

        return new HmsException(    "PROFILE_SERVICE_ERROR",    HttpStatus.INTERNAL_SERVER_ERROR );
    }

}

}