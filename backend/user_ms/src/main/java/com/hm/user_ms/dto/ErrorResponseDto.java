package com.hm.user_ms.dto;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ErrorResponseDto {

    private String errorMessage;
    private Integer errorCode;

}