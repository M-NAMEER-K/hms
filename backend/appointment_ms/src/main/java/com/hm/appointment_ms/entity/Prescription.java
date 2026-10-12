package com.hm.appointment_ms.entity;

import java.time.LocalDate;

import com.hm.appointment_ms.dto.PrescriptionDto;
import com.hm.appointment_ms.dto.PrescriptionDetailsDto;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity 
public class Prescription {
    
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long patientId;
    private Long doctorId;
   
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="appointment_id")
    private Appointment appointment;
    private LocalDate prescriptionDate;
    private String notes;
    

    public Prescription(Long id){
         this.id=id;
    }

    public PrescriptionDto toDto(){
          return new PrescriptionDto( this.id , this.patientId , this.doctorId , this.appointment.getId() ,
         prescriptionDate , notes,null);
    }

    public PrescriptionDetailsDto toDetails(){
       return new PrescriptionDetailsDto(this.id, this.patientId, this.doctorId, null,null, appointment.getId(),this.prescriptionDate,this.notes,null);
    }
}
