package com.hm.profile_ms.entity;
import java.time.LocalDate;
import java.util.List;

import com.hm.profile_ms.dto.BloodGroup;
import com.hm.profile_ms.dto.PatientDto;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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
public class Patient {
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
    private String aadharNumber;

     @Enumerated(EnumType.STRING)
    private BloodGroup bloodGroup;

    @ElementCollection
    private List<String> allergies;
    
    @ElementCollection
    private List<String> chronicDisease;

     public PatientDto toDto(){
           return new PatientDto(this.id,this.name,this.email,this.phone,this.dob,this.profilePictureId,
                                 this.address,this.aadharNumber,this.bloodGroup,this.allergies,this.chronicDisease);
      }
}
