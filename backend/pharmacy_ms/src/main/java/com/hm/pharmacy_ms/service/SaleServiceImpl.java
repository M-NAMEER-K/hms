package com.hm.pharmacy_ms.service;

import java.time.LocalDateTime;
import java.util.List;
import com.hm.pharmacy_ms.dto.SaleDto;
import com.hm.pharmacy_ms.dto.SaleItemDto;
import com.hm.pharmacy_ms.dto.SaleRequestDto;
import com.hm.pharmacy_ms.entity.Medicine;
import com.hm.pharmacy_ms.entity.MedicineInventory;
import com.hm.pharmacy_ms.entity.Sale;
import org.springframework.stereotype.Service;

import com.hm.pharmacy_ms.entity.Sale;
import com.hm.pharmacy_ms.exception.HmsException;
import com.hm.pharmacy_ms.repository.MedicineRepository;
import com.hm.pharmacy_ms.repository.SaleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class SaleServiceImpl implements SaleService {
        
    private final SaleRepository saleRepository;
    private final SaleItemService saleItemService;
    private final MedicineInventoryService medicineInventoryService;
    private final MedicineRepository medicineRepository;

         @Override 
         @Transactional 
         public Long createSale(SaleRequestDto dto) throws HmsException{
            if(dto.getPrescriptionId()!=null && saleRepository.existsByPrescriptionId(dto.getPrescriptionId())){
                  throw new HmsException("SALE_ALREADY_EXISTS");
            }

              for(SaleItemDto saleItem:dto.getSaleItems()){
                    Medicine medicine = medicineRepository.findById(saleItem.getMedicineId())
                     .orElseThrow(() -> new HmsException("MEDICINE_NOT_FOUND"));
               saleItem.setUnitPrice(medicine.getUnitPrice().doubleValue());

               saleItem.setBatchNumber( medicineInventoryService.sellStock(saleItem.getMedicineId(), saleItem.getQuantity()));
              }
              
              Sale sale=new Sale(null , dto.getPrescriptionId(),dto.getBuyerName(),dto.getBuyerContact(),LocalDateTime.now(),dto.getTotalAmount());
              sale=saleRepository.save(sale);
              saleItemService.createSaleItems(sale.getId(), dto.getSaleItems() );
             return sale.getId();
         }

         @Override 
         public void updateSale(SaleDto dto) throws HmsException{
              Sale sale= saleRepository.findById(dto.getId()).orElseThrow(() -> new HmsException("SALE_NOT_FOUND"));
              sale.setSaleDate(dto.getSaleDate());
              sale.setTotalAmount(dto.getTotalAmount());
               saleRepository.save(sale);
         }

         @Override 
         public SaleDto getSale(Long id) throws HmsException{
                return saleRepository.findById(id).orElseThrow(()-> new HmsException("SALE_NOT_FOUND")).toDto();
         }

         @Override 
         public SaleDto getSaleByPrescriptionId(Long prescriptionId) throws HmsException{
             return saleRepository.findByPrescriptionId(prescriptionId).orElseThrow(() -> new HmsException("SALE_NOT_FOUND")).toDto();
         }
    
         @Override
         public List<SaleDto> getAllSales( ) throws HmsException{
     return ((List<Sale>) saleRepository.findAll()).stream().map(Sale::toDto).toList();
         }
        
}
