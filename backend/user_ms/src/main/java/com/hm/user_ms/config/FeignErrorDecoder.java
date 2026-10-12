package com.hm.user_ms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hm.user_ms.dto.ErrorResponseDto;
import com.hm.user_ms.exception.HmsException;

import feign.Response;
import feign.codec.ErrorDecoder;


public class FeignErrorDecoder implements ErrorDecoder {

    private ObjectMapper mapper = new ObjectMapper();


    @Override
    public Exception decode(String methodKey, Response response) {

        try {

            ErrorResponseDto error = mapper.readValue(
                    response.body().asInputStream(),
                    ErrorResponseDto.class
            );


            return new HmsException(error.getErrorMessage());


        } catch(Exception e){

            return new HmsException("PROFILE_SERVICE_ERROR");
        }

    }

}