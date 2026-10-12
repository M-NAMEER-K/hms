package com.hm.appointment_ms.Service;

import java.util.List;

import com.hm.appointment_ms.dto.MedicineDto;

public interface MedicineService {
       
      public Long saveMedicine(MedicineDto request);
      public List<MedicineDto> saveAllMedicines(List<MedicineDto> requestList);
      public List<MedicineDto> getAllMedicinesByPrescriptionId(Long prescriptionId);
      public List<MedicineDto> getMedicinesByPrescriptionIds(List<Long>prescriptionIds);
}
