package com.hm.pharmacy_ms.repository;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.hm.pharmacy_ms.entity.Medicine;
import com.hm.pharmacy_ms.entity.MedicineInventory;
import com.hm.pharmacy_ms.entity.StockStatus;


public interface MedicineInventoryRepository extends JpaRepository< MedicineInventory , Long>{

    List<MedicineInventory> findByExpiryDateBefore(LocalDate date);
    List<MedicineInventory> findByMedicineAndExpiryDateAfterAndQuantityGreaterThanAndStatusOrderByExpiryDateAsc(Medicine medicineId , LocalDate date, Integer quantity , StockStatus status);
}