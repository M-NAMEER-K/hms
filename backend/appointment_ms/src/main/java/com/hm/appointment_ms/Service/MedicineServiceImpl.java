package com.hm.appointment_ms.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hm.appointment_ms.dto.MedicineDto;
import com.hm.appointment_ms.entity.Medicine;
import com.hm.appointment_ms.repositories.MedicineRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class MedicineServiceImpl  implements MedicineService{
    
      private final MedicineRepository medicineRepository;

      @Override 
      public Long saveMedicine(MedicineDto request){
         return medicineRepository.save(request.toEntity()).getId();
      }

      @Override
      public List<MedicineDto> saveAllMedicines(List<MedicineDto> requestList){
           
           return  ((List<Medicine>)medicineRepository.saveAll( requestList.stream().map(MedicineDto::toEntity).toList())).stream().map(Medicine::toDto).toList();
           
      }

      @Override 
        public List<MedicineDto> getAllMedicinesByPrescriptionId(Long prescriptionId){
           
           return  ((List<Medicine>)medicineRepository.findAllByPrescription_Id( prescriptionId)).stream().map(Medicine::toDto).toList();
           
      }

      @Override 
         public List<MedicineDto> getMedicinesByPrescriptionIds(List<Long>prescriptionIds){
           return medicineRepository.findAllByPrescription_IdIn(prescriptionIds).stream().map(Medicine::toDto).toList();
         }

}
