package com.hm.appointment_ms.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hm.appointment_ms.Utility.StringListConverter;
import com.hm.appointment_ms.clients.ProfileClient;
import com.hm.appointment_ms.dto.AppointmentRecordDto;
import com.hm.appointment_ms.dto.DoctorName;
import com.hm.appointment_ms.dto.RecordDetailsDto;
import com.hm.appointment_ms.entity.AppointmentRecord;
import com.hm.appointment_ms.exception.HmsException;
import com.hm.appointment_ms.repositories.AppointmentRecordRepository;
import com.hm.appointment_ms.repositories.AppointmentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
@Transactional
public class AppointmentRecordServiceImpl implements AppointmentRecordService{
       
    private final AppointmentRecordRepository appointmentRecordRepository;
    private final PrescriptionService prescriptionService;
    private final ProfileClient profileClient;
     private final AppointmentRepository appointmentRepository;

    @Override 
    public Long createAppointmentRecord(AppointmentRecordDto request) throws HmsException{
       Optional<AppointmentRecord> existingRecord=appointmentRecordRepository.findByAppointment_Id(request.getAppointmentId());
         if(existingRecord.isPresent()){
             throw new HmsException("APPOINTMENT_RECORD_ALREADY_EXISTS");
         }
           Long id=appointmentRecordRepository.save(request.toEntity()).getId();
           if(request.getPrescription()!=null){
             request.getPrescription().setAppointmentId(request.getAppointmentId());
             prescriptionService.savePrescription(request.getPrescription());
           }
           appointmentRepository.updateAppointmentStatus(request.getAppointmentId());
           return id;
    }

    @Override 
    public void updateAppointmentRecord(AppointmentRecordDto request) throws HmsException{
         AppointmentRecord existing=appointmentRecordRepository.findById(request.getId()).orElseThrow(()-> new HmsException("APPOINTMENT_RECORD_NOT_FOUND"));
         existing.setNotes(request.getNotes());
         existing.setDiagnosis(request.getDiagnosis());
         existing.setFollowUpdate(request.getFollowUpdate());
         existing.setSymptoms(StringListConverter.convertListToString(request.getSymptoms()));
         existing.setTests(StringListConverter.convertListToString(request.getTests()));

         appointmentRecordRepository.save(existing);
    }

    @Override 
    public AppointmentRecordDto getAppointmentRecordByAppointmentId(Long appointmentId) throws HmsException{
          return appointmentRecordRepository.findByAppointment_Id(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_RECORD_NOT_FOUND")).toDto();
    }

    @Override 
    public AppointmentRecordDto getAppointmentRecordById(Long recordId) throws HmsException{
            return appointmentRecordRepository.findById(recordId).orElseThrow(()-> new HmsException("APPOINTMENT_RECORD_NOT_FOUND")).toDto();
    }

    @Override 
    public AppointmentRecordDto getAppointmentRecordDetailsByAppointmentId(Long appointmentId) throws HmsException{
         AppointmentRecordDto record= appointmentRecordRepository.findByAppointment_Id(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_RECORD_NOT_FOUND")).toDto();
    
           record.setPrescription(prescriptionService.getPrescriptionByAppointmentId(appointmentId));
            return record;
        }

    @Override 
     public  List<RecordDetailsDto> getRecordsByPatientId(Long patientId) throws HmsException{
           List<AppointmentRecord> records=appointmentRecordRepository.findByPatientId(patientId);
           List<RecordDetailsDto> recordDetails=records.stream().map(AppointmentRecord::toRecordDetailsDto).toList();

           List<Long> doctorIds=recordDetails.stream().map(RecordDetailsDto::getDoctorId).distinct().toList();
           List<DoctorName> doctors=profileClient.getDoctorsById(doctorIds);
           Map<Long , String> doctorMap=doctors.stream().collect(Collectors.toMap(DoctorName::getId,DoctorName::getName));
           recordDetails.forEach( record -> {
             String doctorName=doctorMap.get(record.getDoctorId());
             if(doctorName !=null){
               record.setDoctorName(doctorName);
             }
             else{
               record.setDoctorName("Unknown Doctor");
             }
           });

           return recordDetails;
     }

     @Override 
      public Boolean isRecordExists(Long appointmentId) throws HmsException{
         

        return appointmentRecordRepository.existsByAppointment_Id(appointmentId);
      }
}
