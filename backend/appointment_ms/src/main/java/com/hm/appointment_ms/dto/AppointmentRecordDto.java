package com.hm.appointment_ms.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.hm.appointment_ms.Utility.StringListConverter;
import com.hm.appointment_ms.entity.Appointment;
import com.hm.appointment_ms.entity.AppointmentRecord;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class AppointmentRecordDto {
    
      
       private Long id;
       private Long patientId;
       private Long doctorId;

       
       private Long appointmentId;
       private List<String> symptoms;
       private String diagnosis;
       private List<String> tests;
       private String notes;
       private String referral;
       private PrescriptionDto prescription;
       private String followUpdate;
       private LocalDateTime createdAt;
       private LocalDateTime updatedAt;
   
       public AppointmentRecord toEntity(){
               return new AppointmentRecord(this.id , this.patientId , this.doctorId , new Appointment(appointmentId) , 
            StringListConverter.convertListToString((symptoms)),this.diagnosis,   StringListConverter.convertListToString((tests)) , this.notes , this.referral , this.followUpdate , this.createdAt , this.updatedAt);
       }

       
}
