package com.hm.appointment_ms.dto.filters;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class AppointmentFilterDto{


    private List<String> status;

    private LocalDate fromDate;

    private LocalDate toDate;

    private Long doctorId;

    
    
      private String sortBy;

    private String sortDirection;

}