package com.hm.appointment_ms.dto;



import java.time.LocalDate;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class PatientDto {
        
    private Long id;
    private String name;
    
    private String email;
     private String phone;
    private LocalDate dob;
    
    private String address;
    
    private String aadharNumber;
     
    private BloodGroup bloodGroup;

      private List<String> allergies;
    private List<String> chronicDisease;

     
}

