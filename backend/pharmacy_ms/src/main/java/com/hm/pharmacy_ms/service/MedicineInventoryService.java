package com.hm.pharmacy_ms.service;

import java.util.List;

import com.hm.pharmacy_ms.dto.MedicineInventoryDto;

import com.hm.pharmacy_ms.exception.HmsException;

public interface MedicineInventoryService {
      
    public List<MedicineInventoryDto> getAllMedicines() throws HmsException;
    public MedicineInventoryDto getMedicineById(Long id) throws HmsException;
    public MedicineInventoryDto addMedicine(MedicineInventoryDto medicine) throws HmsException;
    public MedicineInventoryDto updateMedicine(MedicineInventoryDto medicine) throws HmsException;
    public String sellStock(Long medicineId , Integer quantity) throws HmsException;
    public void deleteMedicine(Long id) throws HmsException;
    public void deleteExpiryMedicines() throws HmsException;

}
