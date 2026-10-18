package com.hm.appointment_ms.dto.filters;

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
public class PrescriptionFilterDto {

    // Filter by one or more doctors
    private List<Long> doctorIds;

    // Filter by prescription date range
   

    // Search by notes (optional)
  

    // Sorting
    private String sortBy ;

    private String sortDirection ;

}