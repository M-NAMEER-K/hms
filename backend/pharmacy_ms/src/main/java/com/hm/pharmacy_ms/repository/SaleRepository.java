package com.hm.pharmacy_ms.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hm.pharmacy_ms.entity.Sale;

public interface SaleRepository extends CrudRepository<Sale , Long> {
        
    Boolean existsByPrescriptionId(Long prescriptionId);
    Optional<Sale> findByPrescriptionId(Long prescriptionid);
}
