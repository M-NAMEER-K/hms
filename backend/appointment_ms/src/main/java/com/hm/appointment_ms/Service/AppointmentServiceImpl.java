package com.hm.appointment_ms.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.hm.appointment_ms.clients.PaymentClient;
import com.hm.appointment_ms.clients.ProfileClient;
import com.hm.appointment_ms.dto.AppointmentDetailsDto;
import com.hm.appointment_ms.dto.AppointmentDto;
import com.hm.appointment_ms.dto.DoctorDto;
import com.hm.appointment_ms.dto.MonthlyVisitDto;
import com.hm.appointment_ms.dto.PatientDto;
import com.hm.appointment_ms.dto.PaymentStatusResponseDto;
import com.hm.appointment_ms.dto.ReasonCountDto;
import com.hm.appointment_ms.dto.StatusDto;
import com.hm.appointment_ms.dto.filters.AppointmentFilterDto;
import com.hm.appointment_ms.dto.specification.AppointmentSpecification;
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
    private ProfileClient profileClient;

     @Autowired
     private PaymentClient paymentClient;

    @Override 
      public Long scheduleAppointment(AppointmentDto appointmentDto) throws HmsException{
         

        
        Boolean doctorExists=profileClient.isDoctorExists(appointmentDto.getDoctorId());
        if(doctorExists == null || !doctorExists){
             throw new HmsException("DOCTOR_NOT_FOUND",HttpStatus.NOT_FOUND);
        }
       


        if(!appointmentDto.getAppointmentTime()
        .toLocalDate()
        .equals(LocalDate.now())){

    throw new HmsException(
        "ONLY_TODAY_APPOINTMENTS_ALLOWED",
        HttpStatus.BAD_REQUEST
    );
}
 DoctorDto doctor =profileClient.getDoctorById(appointmentDto.getDoctorId());
    if(!isDoctorAvailable(doctor,appointmentDto.getAppointmentTime())){

throw new HmsException("DOCTOR_NOT_AVAILABLE_AT_SELECTED_TIME",HttpStatus.BAD_REQUEST);

}
        Boolean patientExists=profileClient.isPatientExists(appointmentDto.getPatientId());
        if(patientExists == null || !patientExists){
             throw new HmsException("PATIENT_NOT_FOUND",HttpStatus.NOT_FOUND);
        }


// Payment verification
System.out.println(
    "REFERENCE ID = " + appointmentDto.getReferenceId()
);
PaymentStatusResponseDto paymentStatus =
        paymentClient.getPaymentStatus(
                "APPOINTMENT",
                appointmentDto.getReferenceId()
        );


if(paymentStatus == null ||
   !"SUCCESS".equals(paymentStatus.getStatus())){

    throw new HmsException(
        "PAYMENT_NOT_COMPLETED",
        HttpStatus.BAD_REQUEST
 
    );
}

        appointmentDto.setStatus(StatusDto.SCHEDULED);
          return appointmentRepository.save(appointmentDto.toEntity()).getId();
      }
      
      @Override 
        public void cancelAppointment(Long appointmentId) throws HmsException{
             Appointment appointment=appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND",HttpStatus.NOT_FOUND));
                     if(appointment.getStatus().equals(StatusDto.CANCELLED)){
                          throw new HmsException("APPOINTMENT_ALREADY_CANCELLED",HttpStatus.CONFLICT);
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
             return appointmentRepository.findById(appointmentId).orElseThrow(()->new HmsException("APPOINTMENT_NOT_FOUND",HttpStatus.NOT_FOUND)).toDto();
       }

       @Override 
        public AppointmentDetailsDto getAppointmentDetailsWithName(Long appointmentId) throws HmsException{
          AppointmentDto appointmentDto=appointmentRepository.findById(appointmentId).orElseThrow(()->new HmsException("APPOINTMENT_NOT_FOUND",HttpStatus.NOT_FOUND)).toDto();
          DoctorDto doctorDto=profileClient.getDoctorById(appointmentDto.getDoctorId());
          PatientDto patientDto=profileClient.getPatientById(appointmentDto.getPatientId());

          return new AppointmentDetailsDto(appointmentDto.getId(),appointmentDto.getPatientId(),patientDto.getName(),
          patientDto.getEmail(),patientDto.getPhone(), patientDto.getProfilePictureId(),
         appointmentDto.getDoctorId(),doctorDto.getName(),appointmentDto.getAppointmentTime(),appointmentDto.getStatus(),
        appointmentDto.getReason(),appointmentDto.getNotes());
        }

        @Override 
         public Page<AppointmentDetailsDto> getAllAppointmentsByPatientId(Long patientId ,AppointmentFilterDto request,int page,int size) throws HmsException{

        Sort sort = Sort.by( Sort.Direction.valueOf(
     request.getSortDirection() ), request.getSortBy()
);


Pageable pageable = PageRequest.of( page, size, sort);
                   
            Page<Appointment> appointments =appointmentRepository.findAll(  AppointmentSpecification.filter(request, patientId),  pageable);
                List<AppointmentDetailsDto> updatedAppointments =appointments.getContent().stream().map(appointment -> {

    DoctorDto doctorDto = profileClient.getDoctorById( appointment.getDoctorId() );


    return new AppointmentDetailsDto(
            appointment.getId(),
            appointment.getPatientId(),
            null,
            null,
            null,
            doctorDto.getProfilePictureId(),
            appointment.getDoctorId(),
            doctorDto.getName(),
            appointment.getAppointmentTime(),
            appointment.getStatus(),
            appointment.getReason(),
            appointment.getNotes()
    );

})
.toList();
                    
                    return new PageImpl<>( updatedAppointments,pageable,appointments.getTotalElements());
         }

         @Override 
         public Page<AppointmentDetailsDto> getAllAppointmentsByDoctorId(Long doctorId,AppointmentFilterDto request,int page,int size) throws HmsException{
              Sort sort = Sort.by(
        Sort.Direction.valueOf(request.getSortDirection()),
        request.getSortBy()
);

Pageable pageable = PageRequest.of(page, size, sort);

Page<Appointment> appointments = appointmentRepository.findAll(
                AppointmentSpecification.filter(request, doctorId),
                pageable
        );

List<AppointmentDetailsDto> updatedAppointments =
        appointments.getContent()
                .stream()
                .map(appointment -> {

                    PatientDto patientDto =
                            profileClient.getPatientById(
                                    appointment.getPatientId()
                            );

                    return new AppointmentDetailsDto(
                            appointment.getId(),
                            appointment.getPatientId(),
                             
                            patientDto.getName(),
                            patientDto.getEmail(),
                            patientDto.getPhone(),
                             patientDto.getProfilePictureId(),
                            appointment.getDoctorId(),
                            null,
                            appointment.getAppointmentTime(),
                            appointment.getStatus(),
                            appointment.getReason(),
                            appointment.getNotes()
                    );
                })
                .toList();

return new PageImpl<>( updatedAppointments, pageable, appointments.getTotalElements());
         }

         @Override
          public void updateAppointment(AppointmentDto dto)  throws HmsException {

            Appointment appointment =  appointmentRepository.findById(dto.getId()).orElseThrow(() -> new HmsException("APPOINTMENT_NOT_FOUND",HttpStatus.NOT_FOUND));
                 
             
         DoctorDto doctor =profileClient.getDoctorById(dto.getDoctorId());
         
         
         
         if(!isDoctorAvailable( doctor, dto.getAppointmentTime())){
   throw new HmsException("DOCTOR_NOT_AVAILABLE_AT_SELECTED_TIME",HttpStatus.BAD_REQUEST);

}




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
               patientDto.getEmail(),patientDto.getPhone(), patientDto.getProfilePictureId(),appointment.getDoctorId(),doctorDto.getName(),appointment.getAppointmentTime(),
            appointment.getStatus(),appointment.getReason(),appointment.getReason());
             }).toList();
        }



     private boolean isDoctorAvailable( DoctorDto doctor, LocalDateTime appointmentTime ){

    if(doctor.getAvailability()==null || doctor.getAvailability().isEmpty()){
        return false;
    }


    DayOfWeek selectedDay =  appointmentTime.getDayOfWeek();
    LocalTime selectedTime = appointmentTime.toLocalTime();



    return doctor.getAvailability().stream().anyMatch(slot ->
                slot.getDay().equals(selectedDay) &&  !selectedTime.isBefore(slot.getStartTime()) && !selectedTime.isAfter(slot.getEndTime())   );
}

}
