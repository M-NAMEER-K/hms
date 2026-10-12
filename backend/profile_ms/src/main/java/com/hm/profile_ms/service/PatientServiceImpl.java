package com.hm.profile_ms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.dto.PatientDto;
import com.hm.profile_ms.entity.Patient;
import com.hm.profile_ms.exception.HmsException;
import com.hm.profile_ms.repository.PatientRepository;

@Service 
public class PatientServiceImpl implements PatientService {
        
    @Autowired 
      private PatientRepository patientRepository;


    @Override
     public Long addPatient(PatientDto patientDto) throws HmsException{
          if(patientDto.getEmail()!=null && patientRepository.findByEmail(patientDto.getEmail()).isPresent()) {
                  throw new HmsException("PATIENT_ALREADY_EXISTS");
                  
          }
          if(patientDto.getAadharNumber()!=null && patientRepository.findByAadharNumber(patientDto.getAadharNumber()).isPresent()) {
                  throw new HmsException("PATIENT_ALREADY_EXISTS");
                  
          }
         return patientRepository.save(patientDto.toEntity()).getId(); 
               
             
          
     }

     @Override 
         public PatientDto getPatientById(Long id) throws HmsException{
               return patientRepository.findById(id).orElseThrow(()-> new HmsException(
                "PATIENT_NOT_FOUND"
               )).toDto();
         }

   @Override
       public PatientDto updatePatient(PatientDto patientDto) throws HmsException{
                patientRepository.findById(patientDto.getId()).orElseThrow(()->new HmsException("PATIENT_NOT_FOUND")).toDto();
                return patientRepository.save(patientDto.toEntity()).toDto();
       }
       @Override 
        public Boolean isPatientExists(Long id) throws HmsException{
          return patientRepository.existsById(id);
        }

        @Override 
        public List<DoctorDropdownDto> getPatientById(List<Long> ids) throws HmsException{
                     return patientRepository.findAllPatientDropdownsByIds(ids);
        }

        @Override 
        public List<PatientDto> getAllPatients() throws HmsException{
          return ((List<Patient>) patientRepository.findAll()).stream().map(patient -> patient.toDto()).toList();
        }

        @Override
public void updateProfilePicture(Long id,Long mediaId) throws HmsException {

    Patient patient=patientRepository.findById(id).orElseThrow(()->new HmsException("PATIENT_NOT_FOUND"));

    patient.setProfilePictureId(mediaId);
     patientRepository.save(patient);

}
}
