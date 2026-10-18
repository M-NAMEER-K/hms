package com.hm.pharmacy_ms.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import com.hm.pharmacy_ms.dto.MedicineDto;
import com.hm.pharmacy_ms.entity.Medicine;
import com.hm.pharmacy_ms.exception.HmsException;
import com.hm.pharmacy_ms.repository.MedicineRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class MedicineServiceImpl implements MedicineService{
    
     private final MedicineRepository medicineRepository;
    
     @Override 
     public Long addMedicine(MedicineDto medicineDto) throws HmsException{
        Optional<Medicine> optional= medicineRepository.findByNameIgnoreCaseAndDosageIgnoreCase(medicineDto.getName(),medicineDto.getDosage());
         
        if(optional.isPresent()){
            throw new HmsException("MEDICINE_ALREADY_EXISTS");
        }
        medicineDto.setStock(0);
        medicineDto.setCreatedAt(LocalDateTime.now());
        return medicineRepository.save(medicineDto.toEntity()).getId();
    }

   @Override 
    public MedicineDto getMedicineById(Long id) throws HmsException{
          return medicineRepository.findById(id).orElseThrow(()-> new HmsException("MEDICINE_NOT_FOUND")).toDto();
    }

 @Override
public void updateMedicine(MedicineDto medicineDto) throws HmsException {

    Medicine existingMedicine = medicineRepository.findById(medicineDto.getId())
            .orElseThrow(() -> new HmsException("MEDICINE_NOT_FOUND"));

    if (!(medicineDto.getName().equalsIgnoreCase(existingMedicine.getName())
            && medicineDto.getDosage().equalsIgnoreCase(existingMedicine.getDosage()))) {

        Optional<Medicine> optional =
                medicineRepository.findByNameIgnoreCaseAndDosageIgnoreCase(
                        medicineDto.getName(),
                        medicineDto.getDosage());

        if (optional.isPresent()) {
            throw new HmsException("MEDICINE_ALREADY_EXISTS");
        }
    }

    existingMedicine.setName(medicineDto.getName());
    existingMedicine.setDosage(medicineDto.getDosage());
    existingMedicine.setCategory(medicineDto.getCategory());
    existingMedicine.setType(medicineDto.getType());
    existingMedicine.setManufacturer(medicineDto.getManufacturer());
    existingMedicine.setUnitPrice(medicineDto.getUnitPrice());

    medicineRepository.save(existingMedicine);
}

@Override
public Page<MedicineDto> getAllMedicines(int page,int size) throws HmsException{

    Pageable pageable = PageRequest.of(page,size);

    Page<Medicine> medicines = medicineRepository.findAll(pageable);

    return medicines.map(Medicine::toDto);
}

      @Override 
      public Integer getStockById(Long id) throws HmsException{
         return medicineRepository.findStockById(id).orElseThrow(()-> new HmsException("MEDICINE_NOT_FOUND"));
      }

      @Override 
        public Integer addStock(Long id, Integer quantity) throws HmsException{
            Medicine medicine=medicineRepository.findById(id).orElseThrow(()-> new HmsException("MEDICINE_NOT_FOUND"));
            medicine.setStock(medicine.getStock()!=null ? medicine.getStock() + quantity :quantity );

            medicineRepository.save(medicine);
            return medicine.getStock();
        }

        @Override 
        public Integer removeStock(Long id , Integer quantity) throws HmsException{
                   Medicine medicine=medicineRepository.findById(id).orElseThrow(()-> new HmsException("MEDICINE_NOT_FOUND"));
            medicine.setStock(medicine.getStock()!=null ? medicine.getStock() - quantity :quantity );

            medicineRepository.save(medicine);
            return medicine.getStock();
        }
}
