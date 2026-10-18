package com.hm.profile_ms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long>{       
    Optional<Patient>findByEmail(String email);
    Optional<Patient>findByAadharNumber(String aadharNumber);

     @Query("SELECT d.id AS id, d.name AS name FROM Patient d WHERE d.id IN ?1")
     List<DoctorDropdownDto> findAllPatientDropdownsByIds(List<Long> ids);
}
