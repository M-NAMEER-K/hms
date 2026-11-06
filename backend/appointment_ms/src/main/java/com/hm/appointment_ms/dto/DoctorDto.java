package com.hm.appointment_ms.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 
public class DoctorDto {
       
   
    private Long id;
    private String name;
    private Long profilePictureId;
    private String email;
    private String phone;
    private LocalDate dob;
    private String address;
      
    private String licenseNumber;
    private String specialization;
    private String department;
    private Integer totalExp;
  private Integer consultationFees;
private String currency;

private List<DoctorAvailabilityDto> availability;
    
}
