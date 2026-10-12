package com.hm.appointment_ms.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.hm.appointment_ms.config.FeignClientInterceptor;
import com.hm.appointment_ms.dto.DoctorDto;
import com.hm.appointment_ms.dto.DoctorName;
import com.hm.appointment_ms.dto.PatientDto;
import com.hm.appointment_ms.exception.HmsException;

@FeignClient(name="profile-ms",url="${profile-ms.url}",configuration={FeignClientInterceptor.class})
public interface ProfileClient {
    

    @GetMapping("/profile/doctor/exists/{id}")
     Boolean isDoctorExists(@PathVariable("id") Long id);

    
    @GetMapping("/profile/patient/exists/{id}")
    Boolean isPatientExists(@PathVariable("id") Long id);

    @GetMapping("/profile/patient/get/{id}")
    PatientDto getPatientById(@PathVariable("id") Long id);

    @GetMapping("/profile/doctor/get/{id}")
    DoctorDto getDoctorById(@PathVariable("id") Long id);

    @GetMapping("/profile/doctor/getDoctorsById")
    List<DoctorName> getDoctorsById(@RequestParam List<Long> ids) throws HmsException;

    @GetMapping("/profile/patient/getPatientsById")
     List<DoctorName> getPatientsById(@RequestParam List<Long> ids);
}
