package com.hm.profile_ms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hm.profile_ms.entity.Doctor;
import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.dto.DoctorDto;
import com.hm.profile_ms.exception.HmsException;
import com.hm.profile_ms.repository.DoctorRepository;

@Service 
public class DoctorServiceImpl implements  DoctorService{
      
    @Autowired 
      private DoctorRepository doctorRepository;

    @Override 
      public Long addDoctor(DoctorDto doctorDto) throws HmsException{
            if(doctorDto.getEmail()!=null && doctorRepository.findByEmail(doctorDto.getEmail()).isPresent()){
                 throw new HmsException("DOCTOR_ALREADY_EXISTS");
            }
            if(doctorDto.getLicenseNumber()!=null && doctorRepository.findByLicenseNumber(doctorDto.getLicenseNumber()).isPresent()){
                 throw new HmsException("DOCTOR_ALREADY_EXISTS");
            }
           return doctorRepository.save(doctorDto.toEntity()).getId();
            
      }
    
      @Override 
         public DoctorDto getDoctorById(Long id ) throws HmsException{
           return doctorRepository.findById(id).orElseThrow(()->new HmsException(("DOCTOR_NOT_FOUND"))).toDto();
         }

        @Override   
         public DoctorDto updateDoctor(DoctorDto doctorDto) throws HmsException{
          System.out.println("DoctorDto received:");
System.out.println("ID = " + doctorDto.getId());
System.out.println("Name = " + doctorDto.getName());
System.out.println("Email = " + doctorDto.getEmail());
            doctorRepository.findById(doctorDto.getId()).orElseThrow(()->new HmsException("DOCTOR_NOT_FOUND"));
            return doctorRepository.save(doctorDto.toEntity()).toDto();
         } 

         @Override
          public Boolean isDoctorExists(Long id) throws HmsException{
             System.out.println("Doctor dropdown API called");
            return doctorRepository.existsById(id);
          }

          @Override 
           public List<DoctorDropdownDto>getDoctorDropdowns() throws HmsException{
             return doctorRepository.findAllDoctorDropdowns();
           }

           @Override 
           public List<DoctorDropdownDto> getDoctorsById(List<Long> ids) throws HmsException{
            return doctorRepository.findAllDoctorDropdownsByIds(ids);
           }

           @Override 
            public List<DoctorDto> getAllDoctors() throws HmsException{
              return ((List<Doctor>)doctorRepository.findAll()).stream().map(doctor -> doctor.toDto()).toList();
            }

            @Override
            public void updateProfilePicture(Long id,Long mediaId) throws HmsException {
           Doctor doctor=doctorRepository.findById(id).orElseThrow(()->new HmsException("DOCTOR_NOT_FOUND"));

      doctor.setProfilePictureId(mediaId);
      doctorRepository.save(doctor);

}
}
