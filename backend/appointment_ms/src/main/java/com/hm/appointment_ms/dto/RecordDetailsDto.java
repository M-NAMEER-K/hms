package com.hm.appointment_ms.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.hm.appointment_ms.entity.Appointment;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor 
@AllArgsConstructor 
@Getter 
@Setter 
public class RecordDetailsDto {
    
    
       private Long id;
       private Long patientId;
       private Long doctorId;

       private String doctorName;
       private Long appointmentId;
       private List<String> symptoms;
       private String diagnosis;
       private List<String> tests;
       private String notes;
       private String referral;
       private String followUpdate;
       private LocalDateTime createdAt;
       private LocalDateTime updatedAt;
}
