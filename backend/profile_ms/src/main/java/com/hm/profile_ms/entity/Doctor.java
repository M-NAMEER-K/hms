package com.hm.profile_ms.entity;

import java.time.LocalDate;

import com.hm.profile_ms.dto.BloodGroup;
import com.hm.profile_ms.dto.DoctorDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@NoArgsConstructor 
@AllArgsConstructor 
@Getter 
@Setter 
public class Doctor {
           
     @Id 
    @GeneratedValue (strategy=GenerationType.IDENTITY)    
    private Long id;
    private String name;
    @Column (unique=true)
    private String email;
    private String phone;
    private LocalDate dob;
    private Long profilePictureId;
    private String address;
     @Column(unique=true)
    private String licenseNumber;
    private String specialization;
    private String department;
    private Integer totalExp;
    
    public DoctorDto toDto(){
      return new DoctorDto(this.id,this.name,this.email,this.phone,this.dob,this.profilePictureId,this.address,this.licenseNumber,
         this.specialization,this.department,this.totalExp);
    }
}
