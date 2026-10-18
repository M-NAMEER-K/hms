package com.hm.profile_ms.api;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.dto.DoctorDto;
import com.hm.profile_ms.dto.filters.DoctorFilterDto;
import com.hm.profile_ms.exception.HmsException;
import com.hm.profile_ms.service.DoctorService;



@RestController 
@RequestMapping("/profile/doctor")
public class DoctorApi {
       
          
    @Autowired 
    private DoctorService doctorService;


    @PostMapping("/add")
    public  ResponseEntity<Long> addDoctor(@RequestBody DoctorDto doctorDto) throws HmsException{
          return new ResponseEntity<>(doctorService.addDoctor(doctorDto),HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DoctorDto> getDoctorById(@PathVariable Long id) throws HmsException{
            return new ResponseEntity<>(doctorService.getDoctorById(id),HttpStatus.OK);
    }

    @PutMapping("/update")
     public ResponseEntity<DoctorDto> updateDoctor(@RequestBody DoctorDto doctorDto) throws HmsException{
                   return new ResponseEntity<>(doctorService.updateDoctor(doctorDto),HttpStatus.OK);
     }

     @GetMapping("/exists/{id}")
     public ResponseEntity<Boolean> doctorExists(@PathVariable Long id)throws HmsException{
       return new ResponseEntity<>(doctorService.isDoctorExists(id),HttpStatus.OK);
     }

     @GetMapping("/dropdowns")
     public ResponseEntity<List<DoctorDropdownDto>>getDoctorDropdowns() throws HmsException{
      return new ResponseEntity<>(doctorService.getDoctorDropdowns(),HttpStatus.OK);
     }

     @GetMapping("/getDoctorsById")
     public ResponseEntity<List<DoctorDropdownDto>> getDoctorById(@RequestParam List<Long> ids) throws HmsException
{
     return new ResponseEntity<>(doctorService.getDoctorsById(ids),HttpStatus.OK);
}
    

 @GetMapping("/getAll")
public ResponseEntity<Page<DoctorDto>> getAllDoctors( @ModelAttribute DoctorFilterDto request, @RequestParam int page, @RequestParam int size) throws HmsException{
        return new ResponseEntity<>(doctorService.getAllDoctors(request,page,size),HttpStatus.OK);
     }

     @GetMapping("/getProfileId/{id}")
     public ResponseEntity<Long> getProfileId(@PathVariable Long id) throws HmsException{
          return new ResponseEntity<>(doctorService.getDoctorById(id).getProfilePictureId(),HttpStatus.OK);
     }

     @PutMapping("/profile-picture/{id}")
     public ResponseEntity<Void> updateProfilePicture( @PathVariable Long id,   @RequestParam(required = false) Long mediaId) throws HmsException {

    doctorService.updateProfilePicture(id, mediaId);

    return ResponseEntity.ok().build();
}

}
