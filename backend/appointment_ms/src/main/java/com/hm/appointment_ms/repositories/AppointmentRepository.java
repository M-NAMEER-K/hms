package com.hm.appointment_ms.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


import com.hm.appointment_ms.dto.AppointmentDetailsDto;
import com.hm.appointment_ms.dto.MonthlyVisitDto;
import com.hm.appointment_ms.dto.ReasonCountDto;
import com.hm.appointment_ms.entity.Appointment;

import feign.Param;

public interface AppointmentRepository extends JpaRepository<Appointment , Long> , JpaSpecificationExecutor<Appointment>{
    
    @Query("SELECT new com.hm.appointment_ms.dto.AppointmentDetailsDto(a.id , a.patientId , null , null , null,a.doctorId , null , a.appointmentTime , a.status , a.reason , a.notes) FROM Appointment a WHERE a.patientId=?1")
    Page<AppointmentDetailsDto> findAllByPatientId(Long patientId , Pageable page);

    @Query("SELECT new com.hm.appointment_ms.dto.AppointmentDetailsDto(a.id , a.patientId , null , null , null,a.doctorId , null , a.appointmentTime , a.status , a.reason , a.notes) FROM Appointment a WHERE a.doctorId=?1")
    Page<AppointmentDetailsDto> findAllByDoctorId(Long doctorId,  Pageable page);

    @Query("SELECT new com.hm.appointment_ms.dto.MonthlyVisitDto(CAST(FUNCTION('MONTHNAME',a.appointmentTime) as String),COUNT(a))from Appointment a where a.patientId=?1 AND YEAR(a.appointmentTime)=YEAR(CURRENT_DATE()) GROUP BY FUNCTION('MONTH',a.appointmentTime),CAST(FUNCTION('MONTHNAME',a.appointmentTime) as String) ORDER BY FUNCTION('MONTH',a.appointmentTime)")
    List<MonthlyVisitDto> countCurrentYearVisitsByPatient(Long patientId);

     @Query("SELECT new com.hm.appointment_ms.dto.MonthlyVisitDto(CAST(FUNCTION('MONTHNAME',a.appointmentTime) as String),COUNT(a))from Appointment a where a.doctorId=?1 AND YEAR(a.appointmentTime)=YEAR(CURRENT_DATE()) GROUP BY FUNCTION('MONTH',a.appointmentTime),CAST(FUNCTION('MONTHNAME',a.appointmentTime) as String) ORDER BY FUNCTION('MONTH',a.appointmentTime)")
    List<MonthlyVisitDto> countCurrentYearVisitsByDoctor(Long doctorId);

     @Query("SELECT new com.hm.appointment_ms.dto.MonthlyVisitDto(CAST(FUNCTION('MONTHNAME',a.appointmentTime) as String),COUNT(a))from Appointment a  where YEAR(a.appointmentTime)=YEAR(CURRENT_DATE()) GROUP BY FUNCTION('MONTH',a.appointmentTime),CAST(FUNCTION('MONTHNAME',a.appointmentTime) as String) ORDER BY FUNCTION('MONTH',a.appointmentTime)")
    List<MonthlyVisitDto> countCurrentYearVisits();
    
    @Query("SELECT new com.hm.appointment_ms.dto.ReasonCountDto(a.reason,COUNT(a)) FROM Appointment a WHERE a.patientId=?1 GROUP BY a.reason")
    List<ReasonCountDto> countReasonByPatientId(Long patientId);

    @Query("SELECT new com.hm.appointment_ms.dto.ReasonCountDto(a.reason,COUNT(a)) FROM Appointment a WHERE a.doctorId=?1 GROUP BY a.reason")
    List<ReasonCountDto> countReasonByDoctorId(Long doctorId);

    @Query("SELECT new com.hm.appointment_ms.dto.ReasonCountDto(a.reason,COUNT(a)) FROM Appointment a GROUP BY a.reason")
    List<ReasonCountDto> countReasons();

    List<Appointment> findByAppointmentTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
   
    @Modifying
    @Query("UPDATE Appointment a SET a.status = 'COMPLETED' WHERE a.id = :appointmentId")
    void updateAppointmentStatus(@Param("appointmentId") Long appointmentId);

    
}
