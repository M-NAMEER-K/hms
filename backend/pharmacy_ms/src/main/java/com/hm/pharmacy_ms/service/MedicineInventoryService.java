package com.hm.pharmacy_ms.service;

import java.util.List;

import com.hm.pharmacy_ms.dto.MedicineInventoryDto;

import com.hm.pharmacy_ms.exception.HmsException;
import org.springframework.data.domain.Page;
public interface MedicineInventoryService {
      
    public Page<MedicineInventoryDto> getAllMedicines(int page,int size) throws HmsException;
    public MedicineInventoryDto getMedicineById(Long id) throws HmsException;
    public MedicineInventoryDto addMedicine(MedicineInventoryDto medicine) throws HmsException;
    public MedicineInventoryDto updateMedicine(MedicineInventoryDto medicine) throws HmsException;
    public String sellStock(Long medicineId , Integer quantity) throws HmsException;
    public void deleteMedicine(Long id) throws HmsException;
    public void deleteExpiryMedicines() throws HmsException;

}
