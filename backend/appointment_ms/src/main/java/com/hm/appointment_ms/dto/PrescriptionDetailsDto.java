package com.hm.appointment_ms.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@AllArgsConstructor 
@NoArgsConstructor 
public class PrescriptionDetailsDto {
    
     private Long id;
     private Long patientId;
     private Long doctorId;
     private String doctorName;
     private String patientName;
     private Long appointmentId;
     private LocalDate prescriptionDate;
     private String notes;
     private List<MedicineDto> medicines;
}
