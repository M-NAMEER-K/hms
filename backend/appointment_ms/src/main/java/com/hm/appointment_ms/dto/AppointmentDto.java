package com.hm.appointment_ms.dto;

import java.time.LocalDateTime;

import com.hm.appointment_ms.entity.Appointment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor 
@AllArgsConstructor 
@Getter 
@Setter 
public class AppointmentDto {
    private Long id;

    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
    private StatusDto status;
    private String reason;
    private String notes;


    public Appointment toEntity(){
          return new Appointment(this.id,this.patientId,this.doctorId,this.appointmentTime,this.status,this.reason,this.notes);
    }
    
}
