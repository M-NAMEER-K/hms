package com.hm.profile_ms.dto;

import java.time.LocalDate;
import java.util.List;

import com.hm.profile_ms.entity.Patient;

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
    private Long profilePictureId;
    private String address;
    
    private String aadharNumber;
     
    private BloodGroup bloodGroup;
    private List<String> allergies;
    private List<String> chronicDisease;

      public Patient toEntity(){
           return new Patient(this.id,this.name,this.email,this.phone,this.dob,this.profilePictureId,this.address,
                              this.aadharNumber,this.bloodGroup,this.allergies,this.chronicDisease);
      }
}
