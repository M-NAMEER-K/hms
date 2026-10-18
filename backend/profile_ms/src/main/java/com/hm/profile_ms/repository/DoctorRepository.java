package com.hm.profile_ms.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


import com.hm.profile_ms.dto.DoctorDropdownDto;
import com.hm.profile_ms.entity.Doctor;



public interface DoctorRepository extends JpaRepository<Doctor,Long>,JpaSpecificationExecutor<Doctor> {
       Optional<Doctor> findByEmail(String email);
       Optional<Doctor> findByLicenseNumber(String licenseNumber);
       
       @Query("SELECT d.id AS id , d.name AS name FROM Doctor d") 
       List<DoctorDropdownDto> findAllDoctorDropdowns();

    @Query("SELECT d.id AS id, d.name AS name FROM Doctor d WHERE d.id IN ?1")
     List<DoctorDropdownDto> findAllDoctorDropdownsByIds(List<Long> ids);
}
