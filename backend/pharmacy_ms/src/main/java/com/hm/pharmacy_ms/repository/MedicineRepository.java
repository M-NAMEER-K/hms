package com.hm.pharmacy_ms.repository;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.hm.pharmacy_ms.entity.Medicine;

public interface MedicineRepository extends CrudRepository< Medicine , Long>{
          Optional<Medicine> findByNameIgnoreCaseAndDosageIgnoreCase(String name, String dosage);
          Optional<Integer> findStockById(Long id);
}