package com.hm.appointment_ms.Api;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hm.appointment_ms.Service.AppointmentService;
import com.hm.appointment_ms.Service.PrescriptionService;
import com.hm.appointment_ms.dto.AppointmentDetailsDto;
import com.hm.appointment_ms.dto.AppointmentDto;
import com.hm.appointment_ms.dto.MedicineDto;
import com.hm.appointment_ms.dto.MonthlyVisitDto;
import com.hm.appointment_ms.dto.ReasonCountDto;
import com.hm.appointment_ms.dto.filters.AppointmentFilterDto;
import com.hm.appointment_ms.exception.HmsException;



@RestController 
@RequestMapping("/appointment")
@Validated 
public class AppointmentApi {
       
    @Autowired 
      private AppointmentService appointmentService;
    
    @Autowired 
    private PrescriptionService prescriptionService;


      @PostMapping("/schedule")
       public ResponseEntity<Long> scheduleAppointment(@RequestBody AppointmentDto appointmentDto) throws HmsException{
           return new ResponseEntity<>(appointmentService.scheduleAppointment(appointmentDto),HttpStatus.CREATED);
       }
      

      @PutMapping("/cancel/{appointmentId}")
           public ResponseEntity<String> cancelAppointment(@PathVariable Long appointmentId) throws  HmsException{
               appointmentService.cancelAppointment(appointmentId);
               return new ResponseEntity<>("Appointment cancelled",HttpStatus.OK);
           }

      @GetMapping("/get/{appointmentId}")
      public ResponseEntity<AppointmentDto> getAppointmentDetails(@PathVariable  Long appointmentId) throws HmsException{
          return new ResponseEntity<>(appointmentService.getAppointmentDetails(appointmentId),HttpStatus.OK);
      }
      
      @GetMapping("/get/details/{appointmentId}")
      public ResponseEntity<AppointmentDetailsDto> getAppointmentDetailsWithName(@PathVariable Long appointmentId) throws HmsException{
         return new ResponseEntity<>(appointmentService.getAppointmentDetailsWithName(appointmentId),HttpStatus.OK);
      }

      @GetMapping("/getAllByPatient/{patientId}")
      public ResponseEntity<Page<AppointmentDetailsDto>> getAllAppointmentsByPatientId(@PathVariable Long patientId,@ModelAttribute  AppointmentFilterDto request,@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10")  int size) throws HmsException{
         return new ResponseEntity<>(appointmentService.getAllAppointmentsByPatientId(patientId,request,page,size),HttpStatus.OK);
      }

      @GetMapping("/getAllByDoctor/{doctorId}")
      public ResponseEntity<Page<AppointmentDetailsDto>> getAllAppointmentsByDoctorId(@PathVariable Long doctorId,@ModelAttribute  AppointmentFilterDto request,@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size) throws HmsException{
         return new ResponseEntity<>(appointmentService.getAllAppointmentsByDoctorId(doctorId,request,page,size),HttpStatus.OK);
      }

      @PutMapping("/update")
      public ResponseEntity<String> updateAppointment( @RequestBody AppointmentDto dto)throws HmsException {
        appointmentService.updateAppointment(dto);
         return new ResponseEntity<>(  "Appointment Updated",  HttpStatus.OK);
}

     @GetMapping("/countByPatient/{patientId}")
     public ResponseEntity<List<MonthlyVisitDto>> getAppointmentCountByPatientId(@PathVariable Long patientId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentCountByPatient(patientId),HttpStatus.OK);
     }

     @GetMapping("/countByDoctor/{doctorId}")
     public ResponseEntity<List<MonthlyVisitDto>> getAppointmentCountByDoctorId(@PathVariable Long doctorId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentCountByDoctor(doctorId),HttpStatus.OK);
     }

     @GetMapping("/visitCount")
     public ResponseEntity<List<MonthlyVisitDto>> getAppointmentCounts( ) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentCounts(),HttpStatus.OK);
     }


     @GetMapping("/countReasonByPatient/{patientId}")
     public ResponseEntity<List<ReasonCountDto>> getReasonsByPatient(@PathVariable Long patientId) throws HmsException{
         return new ResponseEntity<>(appointmentService.getReasonCountByPatient(patientId),HttpStatus.OK);
     }

      @GetMapping("/countReasonByDoctor/{doctorId}")
     public ResponseEntity<List<ReasonCountDto>> getReasonsByDoctor(@PathVariable Long doctorId) throws HmsException{
         return new ResponseEntity<>(appointmentService.getReasonCountByDoctor(doctorId),HttpStatus.OK);
     }

      @GetMapping("/countReasons")
     public ResponseEntity<List<ReasonCountDto>> getReasons() throws HmsException{
         return new ResponseEntity<>(appointmentService.getReasonCount(),HttpStatus.OK);
     }

     @GetMapping("/getMedicinesByPatient/{patientId}")
     public ResponseEntity<List<MedicineDto>> getMedicinesByPatientId(@PathVariable Long patientId) throws HmsException{
         return new ResponseEntity<>(prescriptionService.getMedicineByPatientId(patientId),HttpStatus.OK);
     }

     @GetMapping("/today")
     public ResponseEntity<List<AppointmentDetailsDto>> getTodayAppointment() throws HmsException{
           return new ResponseEntity<>(appointmentService.getTodayAppointments(),HttpStatus.OK);
     }

     
   }
