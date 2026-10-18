package com.hm.profile_ms.api;

import java.util.List;
import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hm.profile_ms.dto.PatientDto;
import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.exception.HmsException;
import com.hm.profile_ms.service.PatientService;

@RestController 
@RequestMapping("/profile/patient")
@Validated 
public class PatientApi {
       
    @Autowired 
    private PatientService patientService;


    @PostMapping("/add")
    public  ResponseEntity<Long> addPatient(@RequestBody PatientDto patientDto) throws HmsException{
          return new ResponseEntity<>(patientService.addPatient(patientDto),HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) throws HmsException{
            return new ResponseEntity<>(patientService.getPatientById(id),HttpStatus.OK);
    }
    @PutMapping("/update")
     public ResponseEntity<PatientDto>updatePatient(@RequestBody PatientDto patientDto) throws HmsException{
                  return new ResponseEntity<>(patientService.updatePatient(patientDto),HttpStatus.OK);
     }

     @GetMapping("/exists/{id}")
     public ResponseEntity<Boolean> patientExists(@PathVariable Long id)throws HmsException{
       return new ResponseEntity<>(patientService.isPatientExists(id),HttpStatus.OK);
     }

     @GetMapping("/getPatientsById")
     public ResponseEntity<List<DoctorDropdownDto>> getPatientsById(@RequestParam List<Long> ids) throws HmsException{
     return new ResponseEntity<>(patientService.getPatientById(ids) , HttpStatus.OK);
     }

     @GetMapping("/getAll")
     public ResponseEntity<Page<PatientDto>> getAllPatients( @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) throws HmsException{
      
        return new ResponseEntity<>(patientService.getAllPatients(page,size),HttpStatus.OK);
     }

      @GetMapping("/getProfileId/{id}")
     public ResponseEntity<Long> getProfileId(@PathVariable Long id) throws HmsException{
          return new ResponseEntity<>(patientService.getPatientById(id).getProfilePictureId(),HttpStatus.OK);
     }

     @PutMapping("/profile-picture/{id}")
    public ResponseEntity<Void> updateProfilePicture(    @PathVariable Long id,  @RequestParam(required = false) Long mediaId) throws HmsException {

    patientService.updateProfilePicture(id, mediaId);

    return ResponseEntity.ok().build();
}

}
