package com.hm.appointment_ms.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.appointment_ms.clients.ProfileClient;
import com.hm.appointment_ms.dto.AppointmentDetailsDto;
import com.hm.appointment_ms.dto.AppointmentDto;
import com.hm.appointment_ms.dto.DoctorDto;
import com.hm.appointment_ms.dto.MonthlyVisitDto;
import com.hm.appointment_ms.dto.PatientDto;
import com.hm.appointment_ms.dto.ReasonCountDto;
import com.hm.appointment_ms.dto.StatusDto;
import com.hm.appointment_ms.entity.Appointment;
import com.hm.appointment_ms.exception.HmsException;
import com.hm.appointment_ms.repositories.AppointmentRepository;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService{
     
    @Autowired
    private AppointmentRepository appointmentRepository;
     
    @Autowired 
    private ApiService apiService;

    @Autowired 
    private ProfileClient profileClient;



    @Override 
      public Long scheduleAppointment(AppointmentDto appointmentDto) throws HmsException{
        Boolean doctorExists=profileClient.isDoctorExists(appointmentDto.getDoctorId());
        if(doctorExists == null || !doctorExists){
             throw new HmsException("DOCTOR_NOT_FOUND");
        }
        Boolean patientExists=profileClient.isPatientExists(appointmentDto.getPatientId());
        if(patientExists == null || !patientExists){
             throw new HmsException("PATIENT_NOT_FOUND");
        }
        appointmentDto.setStatus(StatusDto.SCHEDULED);
          return appointmentRepository.save(appointmentDto.toEntity()).getId();
      }
      
      @Override 
        public void cancelAppointment(Long appointmentId) throws HmsException{
             Appointment appointment=appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND"));
                     if(appointment.getStatus().equals(StatusDto.CANCELLED)){
                          throw new HmsException("APPOINTMENT_ALREADY_CANCELLED");
                     }

                     appointment.setStatus(StatusDto.CANCELLED);
                    appointmentRepository.save(appointment);
        }

        @Override 
         public void completeAppointment(Long appointmentId) throws HmsException{

         }
         
         @Override 
          public void rescheduleAppointment(Long appointmentId , String newDateTime){

          }
      @Override 
       public AppointmentDto getAppointmentDetails(Long appointmentId) throws HmsException{
             return appointmentRepository.findById(appointmentId).orElseThrow(()->new HmsException("APPOINTMENT_NOT_FOUND")).toDto();
       }

       @Override 
        public AppointmentDetailsDto getAppointmentDetailsWithName(Long appointmentId) throws HmsException{
          AppointmentDto appointmentDto=appointmentRepository.findById(appointmentId).orElseThrow(()->new HmsException("APPOINTMENT_NOT_FOUND")).toDto();
          DoctorDto doctorDto=profileClient.getDoctorById(appointmentDto.getDoctorId());
          PatientDto patientDto=profileClient.getPatientById(appointmentDto.getPatientId());

          return new AppointmentDetailsDto(appointmentDto.getId(),appointmentDto.getPatientId(),patientDto.getName(),
          patientDto.getEmail(),patientDto.getPhone(),
         appointmentDto.getDoctorId(),doctorDto.getName(),appointmentDto.getAppointmentTime(),appointmentDto.getStatus(),
        appointmentDto.getReason(),appointmentDto.getNotes());
        }

        @Override 
         public List<AppointmentDetailsDto> getAllAppointmentsByPatientId(Long patientId) throws HmsException{
                 return  appointmentRepository.findAllByPatientId(patientId).stream().map(
                    appointment->{
                         DoctorDto doctorDto=profileClient.getDoctorById(appointment.getDoctorId());
                         System.out.println("Doctor DTO = " + doctorDto);
System.out.println("Doctor Name = " + doctorDto.getName());
                         appointment.setDoctorName(doctorDto.getName());
                         return appointment;
                    }
                 ).toList();
         }

         @Override 
         public List<AppointmentDetailsDto> getAllAppointmentsByDoctorId(Long doctorId) throws HmsException{
           return  appointmentRepository.findAllByDoctorId(doctorId).stream().map(
                    appointment->{
                         PatientDto patientDto=profileClient.getPatientById(appointment.getPatientId());
                         appointment.setPatientName(patientDto.getName());
                         appointment.setPatientEmail(patientDto.getEmail());
                         appointment.setPatientPhone(patientDto.getPhone());
                         return appointment;
                    }
                 ).toList();
         }

         @Override
          public void updateAppointment(AppointmentDto dto)  throws HmsException {

            Appointment appointment =  appointmentRepository.findById(dto.getId()).orElseThrow(() -> new HmsException("APPOINTMENT_NOT_FOUND"));

    appointment.setDoctorId(dto.getDoctorId());
    appointment.setAppointmentTime(dto.getAppointmentTime());
    appointment.setReason(dto.getReason());
    appointment.setNotes(dto.getNotes());

    appointmentRepository.save(appointment);
}

    @Override 
     public List<MonthlyVisitDto> getAppointmentCountByPatient(Long patientId) throws HmsException{
          return appointmentRepository.countCurrentYearVisitsByPatient(patientId);
     }

     @Override
      public List<ReasonCountDto> getReasonCountByPatient(Long patientId) throws HmsException{
          return appointmentRepository.countReasonByPatientId(patientId);
      }

      @Override
      public List<ReasonCountDto> getReasonCountByDoctor(Long doctorId) throws HmsException{
          return appointmentRepository.countReasonByDoctorId(doctorId);
      }

     @Override
      public List<MonthlyVisitDto> getAppointmentCountByDoctor(Long doctorId) throws HmsException{
        return appointmentRepository.countCurrentYearVisitsByDoctor(doctorId);
      }

      @Override 
      public List<MonthlyVisitDto> getAppointmentCounts() throws HmsException{
            return appointmentRepository.countCurrentYearVisits();
      }

      @Override 
      public List<ReasonCountDto> getReasonCount() throws HmsException{
          return appointmentRepository.countReasons();
      }

      @Override 
      public List<AppointmentDetailsDto> getTodayAppointments() throws HmsException{
             LocalDate today=LocalDate.now();
             LocalDateTime startOfDay=today.atStartOfDay();
             LocalDateTime endOfDay=today.atTime(LocalTime.MAX);
             return appointmentRepository.findByAppointmentTimeBetween(startOfDay, endOfDay).stream().map(appointment->{
                   DoctorDto doctorDto=profileClient.getDoctorById(appointment.getDoctorId());
                   PatientDto patientDto=profileClient.getPatientById(appointment.getPatientId());
                   return new AppointmentDetailsDto(appointment.getId(),appointment.getPatientId(),patientDto.getName(),
               patientDto.getEmail(),patientDto.getPhone(),appointment.getDoctorId(),doctorDto.getName(),appointment.getAppointmentTime(),
            appointment.getStatus(),appointment.getReason(),appointment.getReason());
             }).toList();
        }
}
