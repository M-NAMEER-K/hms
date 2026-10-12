package com.hm.pharmacy_ms.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hm.pharmacy_ms.entity.SaleItem;

public interface SaleItemRepository  extends CrudRepository<SaleItem , Long>{
    
    List<SaleItem> findBySaleId(Long saleId);
    List<SaleItem> findByMedicineId(Long medicineId);
}
