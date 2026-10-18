package com.hm.pharmacy_ms.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hm.pharmacy_ms.dto.MedicineInventoryDto;
import com.hm.pharmacy_ms.entity.StockStatus;
import com.hm.pharmacy_ms.entity.Medicine;
import com.hm.pharmacy_ms.entity.MedicineInventory;
import com.hm.pharmacy_ms.exception.HmsException;
import com.hm.pharmacy_ms.repository.MedicineInventoryRepository;
import com.hm.pharmacy_ms.repository.MedicineRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional 
@RequiredArgsConstructor 
public class MedicineInventoryServiceImpl  implements MedicineInventoryService{
        

     private final MedicineService medicineService;
      private final MedicineRepository medicineRepository;
    private final MedicineInventoryRepository medicineInventoryRepository;
     
  @Override
public Page<MedicineInventoryDto> getAllMedicines(int page, int size) throws HmsException {

    Pageable pageable = PageRequest.of(page, size);

    Page<MedicineInventory> inventories =
            medicineInventoryRepository.findAll(pageable);

    return inventories.map(MedicineInventory::toDto);
}
    

      @Override 
      public MedicineInventoryDto getMedicineById(Long id) throws HmsException{
          return medicineInventoryRepository.findById(id).orElseThrow(()-> new HmsException("INVENTORY_NOT_FOUND")).toDto();
      }

    @Override 
       public MedicineInventoryDto addMedicine(MedicineInventoryDto medicine) throws HmsException{
             medicine.setAddedDate(LocalDate.now());
             medicineService.addStock(medicine.getMedicineId(),medicine.getQuantity());
             medicine.setInitialQuantity(medicine.getQuantity());
             medicine.setStatus(StockStatus.ACTIVE);
             return medicineInventoryRepository.save(medicine.toEntity()).toDto();
    }

    @Override 
    public MedicineInventoryDto updateMedicine(MedicineInventoryDto medicine) throws HmsException{
            MedicineInventory existingInventory=medicineInventoryRepository.findById(medicine.getId()).orElseThrow(()-> new HmsException("INVENTORY_NOT_FOUND"));
            existingInventory.setBatchNumber(medicine.getBatchNumber());
              if(existingInventory.getInitialQuantity() < medicine.getQuantity()){
                 medicineService.addStock(medicine.getMedicineId(),medicine.getQuantity()- existingInventory.getInitialQuantity());

              }
              else if(existingInventory.getInitialQuantity() > medicine.getQuantity()){
                medicineService.removeStock(medicine.getMedicineId(),existingInventory.getInitialQuantity() -medicine.getQuantity());
              }
            existingInventory.setQuantity(medicine.getQuantity());
            existingInventory.setExpiryDate(medicine.getExpiryDate());
            existingInventory.setInitialQuantity(medicine.getInitialQuantity());
            return medicineInventoryRepository.save(existingInventory).toDto();
    }
      @Override 
      public void deleteMedicine(Long id) throws HmsException{
          medicineInventoryRepository.deleteById(id);
      }

        private void markExpired(List<MedicineInventory> inventories) throws HmsException{
          for(MedicineInventory inventory : inventories){
              inventory.setStatus(StockStatus.EXPIRED);
          }
       }

      @Override
       @Scheduled (cron="0 15 13 * * ?")
      public void deleteExpiryMedicines() throws HmsException{
        System.out.println("Deleting expired medicine.. ");
          List<MedicineInventory> expiredMedicines = medicineInventoryRepository.findByExpiryDateBefore(LocalDate.now());
          for(MedicineInventory medicine : expiredMedicines){
            medicineService.removeStock(medicine.getMedicine().getId(),medicine.getQuantity());
          }

            this.markExpired(expiredMedicines);
      }

      @Scheduled (cron="0 15 13 * * ?")
      public void print(){
         System.out.println("Scehdule task is running...");
      }

      @Override
      @Transactional  
      public String sellStock(Long medicineId , Integer quantity) throws HmsException{
            
            Medicine medicine = medicineRepository.findById(medicineId)
            .orElseThrow(() -> new HmsException("MEDICINE_NOT_FOUND"));



           List<MedicineInventory> inventories=medicineInventoryRepository.findByMedicineAndExpiryDateAfterAndQuantityGreaterThanAndStatusOrderByExpiryDateAsc(
            medicine, LocalDate.now(), 0 , StockStatus.ACTIVE);
            if(inventories.isEmpty()){
              throw new HmsException("OUT_OF_STOCK");
            }
        StringBuilder batchDetails = new StringBuilder();
        int remainingQuantity=quantity;
        for(MedicineInventory inventory : inventories){
            
          if(remainingQuantity <=0){
              break;
          }
          int availableQuantity = inventory.getQuantity();
          if(availableQuantity <= remainingQuantity){
               batchDetails.append(String.format("Batch %s: %d units\n", inventory.getBatchNumber(),availableQuantity));
               remainingQuantity-=availableQuantity;
               inventory.setQuantity(0);
               inventory.setStatus(StockStatus.SOLD_OUT);
              
          }
          else{
               batchDetails.append(String.format("Batch %s: %d units\n", inventory.getBatchNumber(),remainingQuantity));
                inventory.setQuantity(availableQuantity - remainingQuantity);
               
                remainingQuantity=0;
          }
           
          
        }
        if(remainingQuantity > 0){
          throw new HmsException("INSUFFICIENT_STOCK");
        }
          medicineService.removeStock(medicineId, quantity);
          medicineInventoryRepository.saveAll(inventories);
         return batchDetails.toString();
      }
}
