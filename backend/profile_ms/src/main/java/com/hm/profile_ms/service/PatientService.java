package com.hm.profile_ms.service;

import java.util.List;

import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.dto.PatientDto;

import com.hm.profile_ms.exception.HmsException;

public interface PatientService {
      
       public Long addPatient(PatientDto patientDto) throws HmsException;
       public PatientDto getPatientById(Long id) throws HmsException;
       public PatientDto updatePatient(PatientDto patientDto) throws HmsException;
       public Boolean isPatientExists(Long id) throws HmsException;
       public List<DoctorDropdownDto> getPatientById(List<Long> ids) throws HmsException;
       public List<PatientDto> getAllPatients() throws HmsException;
       public void updateProfilePicture(Long id,Long mediaId) throws HmsException;
}
