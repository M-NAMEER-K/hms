package com.hm.user_ms.dto;


import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ErrorResponseDto {

    private String errorMessage;
    private Integer errorCode;
   private LocalDateTime timestamp;
}