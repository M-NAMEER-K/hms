package com.hm.payment_ms.exception;

import org.springframework.http.HttpStatus;

public class HmsException extends Exception {

    private HttpStatus status;

    public HmsException(String message, HttpStatus status){
        super(message);
        this.status=status;
    }

    public HttpStatus getStatus(){
        return status;
    }
}