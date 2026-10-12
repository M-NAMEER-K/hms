package com.hm.appointment_ms.entity;

import java.time.LocalDateTime;

import org.bouncycastle.util.StringList;

import com.hm.appointment_ms.Utility.StringListConverter;
import com.hm.appointment_ms.dto.AppointmentRecordDto;
import com.hm.appointment_ms.dto.RecordDetailsDto;

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
public class AppointmentRecord {

       @Id 
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       private Long patientId;
       private Long doctorId;

       @OneToOne(fetch=FetchType.LAZY)
       @JoinColumn(name="appointment_id")
       private Appointment appointment;
       private String symptoms;
       private String diagnosis;
       private String tests;
       private String notes;
       private String referral;
       private String followUpdate;
       private LocalDateTime createdAt;
       private LocalDateTime updatedAt;
       
        public AppointmentRecordDto toDto(){
               return new AppointmentRecordDto(this.id , this.patientId , this.doctorId ,     this.appointment.getId(),
          StringListConverter.convertStringToList(this.symptoms),this.diagnosis,  StringListConverter.convertStringToList(this.tests) , this.notes , this.referral ,null, this.followUpdate , this.createdAt , this.updatedAt);
       }

       public RecordDetailsDto toRecordDetailsDto(){
              return new RecordDetailsDto(this.id , this.patientId , this.doctorId ,null , appointment.getId() ,
       StringListConverter.convertStringToList(this.symptoms),this.diagnosis , StringListConverter.convertStringToList(this.tests)
,this.notes , this.referral , this.followUpdate , this.createdAt,this.updatedAt);
       }
}
