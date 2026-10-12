package com.hm.appointment_ms.dto;

import java.time.LocalDate;
import java.util.List;

import com.hm.appointment_ms.entity.Appointment;
import com.hm.appointment_ms.entity.Prescription;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class PrescriptionDto {
    
      private Long id;
      private Long patientId;
      private Long doctorId;
      private Long appointmentId;
      private LocalDate prescriptionDate;
      private String notes;
      private List<MedicineDto> medicines;

      public Prescription toEntity(){
          return new Prescription(this.id , this.patientId , this.doctorId , new Appointment(appointmentId) ,
         prescriptionDate , notes);
      }
}
