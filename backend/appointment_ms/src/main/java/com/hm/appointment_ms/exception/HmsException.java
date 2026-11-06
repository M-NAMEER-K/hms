package com.hm.appointment_ms.exception;

import org.springframework.http.HttpStatus;

public class HmsException extends Exception {

    private static final long serialVersionUID = 1L;

    private final HttpStatus status;

    public HmsException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus(){
        return status;
    }
}