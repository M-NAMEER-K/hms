package com.hm.appointment_ms.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hm.appointment_ms.entity.Medicine;

public interface MedicineRepository extends CrudRepository<Medicine , Long> {
        
    List<Medicine> findAllByPrescription_Id(Long prescriptionId);
    List<Medicine> findAllByPrescription_IdIn(List<Long> prescriptionIds);

} 
