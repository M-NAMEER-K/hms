package com.hm.appointment_ms.dto;

import java.time.LocalDate;




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
       
       @Id 
    @GeneratedValue (strategy=GenerationType.IDENTITY)    
    private Long id;
    private String name;

    private String email;
    private String phone;
    private LocalDate dob;
    private String address;
     
    private String licenseNumber;
    private String specialization;
    private String department;
    private Integer totalExp;

    
}
