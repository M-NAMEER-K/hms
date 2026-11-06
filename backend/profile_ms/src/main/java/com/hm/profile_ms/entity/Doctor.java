package com.hm.profile_ms.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.hm.profile_ms.dto.BloodGroup;
import com.hm.profile_ms.dto.DoctorDto;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    private Integer consultationFees;
    private String currency;

  @ElementCollection
  @CollectionTable( name = "doctor_availability", joinColumns = @JoinColumn(name = "doctor_id"))
  private List<DoctorAvailability> availability = new ArrayList<>();
    
    public DoctorDto toDto(){
      return new DoctorDto(this.id,this.name,this.email,this.phone,this.dob,this.profilePictureId,this.address,this.licenseNumber,
         this.specialization,this.department,this.totalExp,  this.consultationFees, this.currency,  this.availability);
    }
}
