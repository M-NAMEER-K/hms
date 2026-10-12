package com.hm.user_ms.utility;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor 
@NoArgsConstructor 
@Setter 
@Getter 
public class ErrorInfo {
          private String errorMessage;
          private Integer errorCode;
          private LocalDateTime timestamp;
}
