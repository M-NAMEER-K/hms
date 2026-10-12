package com.hm.pharmacy_ms.service;

import java.util.List;

import com.hm.pharmacy_ms.dto.MedicineDto;
import com.hm.pharmacy_ms.exception.HmsException;

public interface MedicineService {
       
      public Long addMedicine(MedicineDto medicineDto) throws HmsException;
      public MedicineDto getMedicineById(Long id) throws HmsException;
      public void updateMedicine( MedicineDto medicineDto) throws HmsException;
         public List<MedicineDto> getAllMedicines() throws HmsException;
         public Integer getStockById(Long id) throws HmsException;
         public Integer addStock(Long id , Integer quantity) throws HmsException;
         public Integer removeStock(Long id ,Integer quantity) throws HmsException;
}
