package com.hm.appointment_ms.entity;

import java.time.LocalDateTime;

import com.hm.appointment_ms.dto.AppointmentDto;
import com.hm.appointment_ms.dto.StatusDto;

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

@NoArgsConstructor 
@AllArgsConstructor 
@Getter 
@Setter 
@Entity 
public class Appointment {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
    
    @Enumerated(EnumType.STRING)
    private StatusDto status;
    private String reason;
    private String notes;

    public AppointmentDto toDto(){
           return new AppointmentDto(this.id,this.patientId,this.doctorId,this.appointmentTime,this.status,this.reason,this.notes);
    }
    public Appointment (Long id){
        this.id=id;
    }
}
