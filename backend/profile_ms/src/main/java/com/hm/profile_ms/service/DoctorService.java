package com.hm.profile_ms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.dto.DoctorDto;
import com.hm.profile_ms.exception.HmsException;


public interface DoctorService {
           public Long addDoctor(DoctorDto doctorDto) throws HmsException;
           public DoctorDto getDoctorById(Long id) throws HmsException;
           public DoctorDto  updateDoctor(DoctorDto doctorDto) throws HmsException;
           public Boolean isDoctorExists(Long id) throws HmsException;
           public List<DoctorDropdownDto> getDoctorDropdowns() throws HmsException;
           public List<DoctorDropdownDto> getDoctorsById(List<Long> ids) throws HmsException;
           public List<DoctorDto> getAllDoctors() throws HmsException;
           void updateProfilePicture(Long id,Long mediaId) throws HmsException;
}
