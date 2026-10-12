package com.hm.appointment_ms.Service;

import java.util.List;

import com.hm.appointment_ms.dto.AppointmentDetailsDto;
import com.hm.appointment_ms.dto.AppointmentDto;
import com.hm.appointment_ms.dto.MonthlyVisitDto;
import com.hm.appointment_ms.dto.ReasonCountDto;
import com.hm.appointment_ms.exception.HmsException;

public interface AppointmentService {
      
      public Long scheduleAppointment(AppointmentDto appointmentDto) throws HmsException;
      public void cancelAppointment(Long appointmentId) throws HmsException;
      public void completeAppointment(Long appointmentId) throws HmsException;
      public void rescheduleAppointment(Long appointmentId , String newDateTime);
      public AppointmentDto getAppointmentDetails(Long appointmentId) throws HmsException;
      public AppointmentDetailsDto getAppointmentDetailsWithName(Long appointmentId) throws HmsException;
      public List<AppointmentDetailsDto> getAllAppointmentsByPatientId(Long patientId) throws HmsException;
      public List<AppointmentDetailsDto> getAllAppointmentsByDoctorId(Long doctorId) throws HmsException;
      public void updateAppointment(AppointmentDto dto) throws HmsException;
      public List<MonthlyVisitDto> getAppointmentCountByPatient(Long patientId) throws HmsException;
      public List<MonthlyVisitDto> getAppointmentCountByDoctor(Long doctorId) throws HmsException;

      public List<MonthlyVisitDto> getAppointmentCounts() throws HmsException;

      public List<ReasonCountDto> getReasonCountByPatient(Long patientId) throws HmsException;
      public List<ReasonCountDto> getReasonCountByDoctor(Long doctorId) throws HmsException;
      public List<ReasonCountDto> getReasonCount() throws HmsException;
      public List<AppointmentDetailsDto> getTodayAppointments() throws HmsException;

}
