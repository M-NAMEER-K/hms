package com.hm.media_ms.exception;

import org.springframework.http.HttpStatus;

public class MediaException extends Exception {

    private final HttpStatus status;

    public MediaException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}