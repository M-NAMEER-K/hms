package com.hm.profile_ms.dto;

import java.time.LocalDate;

import com.hm.profile_ms.entity.Doctor;

import jakarta.persistence.Column;
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
    private Long profilePictureId;
    private String address;
     
    private String licenseNumber;
    private String specialization;
    private String department;
    private Integer totalExp;

    public Doctor toEntity(){
    return new Doctor(this.id,this.name,this.email,this.phone,this.dob,this.profilePictureId,this.address,this.licenseNumber,
         this.specialization,this.department,this.totalExp);
    }
}
