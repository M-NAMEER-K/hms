package com.hm.appointment_ms.Api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hm.appointment_ms.Service.AppointmentRecordService;
import com.hm.appointment_ms.Service.PrescriptionService;
import com.hm.appointment_ms.dto.AppointmentRecordDto;
import com.hm.appointment_ms.dto.MedicineDto;
import com.hm.appointment_ms.dto.PrescriptionDetailsDto;
import com.hm.appointment_ms.dto.RecordDetailsDto;
import com.hm.appointment_ms.exception.HmsException;
import com.hm.appointment_ms.Service.MedicineService;
import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/appointment/report") 
@Validated 
@RequiredArgsConstructor 
public class AppointmentRecordApi {
    
       private final AppointmentRecordService appointmentRecordService;
       private final PrescriptionService prescriptionService;
       private final MedicineService medicineService;

       @PostMapping("/create")
       public ResponseEntity<Long> createAppointmentReport(@RequestBody AppointmentRecordDto request) throws HmsException{
         return new ResponseEntity<>(appointmentRecordService.createAppointmentRecord(request),HttpStatus.CREATED);
       }

       @PutMapping("/update")
       public ResponseEntity<String> updateAppointmentReport(@RequestBody AppointmentRecordDto request) throws HmsException{
             return new ResponseEntity<>("Appointment Report Updated.",HttpStatus.OK);
       }

       @GetMapping("/getByAppointmentId/{appointmentId}")
       public ResponseEntity<AppointmentRecordDto> getAppointmentReportByAppointmentId(@PathVariable Long appointmentId) throws HmsException{
           return new ResponseEntity<>(appointmentRecordService.getAppointmentRecordByAppointmentId(appointmentId),HttpStatus.OK);
       }

       @GetMapping("/getDetailsByAppointmentId/{appointmentId}")
        public ResponseEntity<AppointmentRecordDto> getAppointmentReportDetailsByAppointmentId(@PathVariable Long appointmentId) throws HmsException{
                    return new ResponseEntity<>(appointmentRecordService.getAppointmentRecordDetailsByAppointmentId(appointmentId),HttpStatus.OK);
        }

       @GetMapping("/getById/{recordId}")
       public ResponseEntity<AppointmentRecordDto> getAppointmentReportById(@PathVariable Long recordId) throws HmsException{
         return new ResponseEntity<>(appointmentRecordService.getAppointmentRecordById(recordId),HttpStatus.OK);
       }
       
       @GetMapping("/getRecordsByPatientId/{patientId}")
       public ResponseEntity<List<RecordDetailsDto>> getRecordsByPatientId(@PathVariable Long patientId) throws HmsException{
        return new ResponseEntity<>(appointmentRecordService.getRecordsByPatientId(patientId),HttpStatus.OK);
       }

       @GetMapping("/getPrescriptionsByPatientId/{patientId}")
       public ResponseEntity<List<PrescriptionDetailsDto>> getPrescriptionsByPatientId(@PathVariable Long patientId) throws HmsException{
          return new ResponseEntity<>(prescriptionService.getPrescriptionsByPatientId(patientId),HttpStatus.OK);
       }

       @GetMapping("/getAllPrescriptions")
       public ResponseEntity<List<PrescriptionDetailsDto>> getAllPrescriptions() throws HmsException{
         return  new ResponseEntity<>(prescriptionService.getPrescriptions() , HttpStatus.OK);
       }

       @GetMapping("/getMedicinesByPrescriptionId/{prescriptionId}")
       public ResponseEntity<List<MedicineDto>> getMedicinesByPrescriptionId(@PathVariable Long prescriptionId) throws HmsException{
             return new ResponseEntity<>(medicineService.getAllMedicinesByPrescriptionId(prescriptionId),HttpStatus.OK);
       }

}
