package com.hm.pharmacy_ms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hm.pharmacy_ms.dto.SaleItemDto;
import com.hm.pharmacy_ms.entity.SaleItem;
import com.hm.pharmacy_ms.exception.HmsException;
import com.hm.pharmacy_ms.repository.SaleItemRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class SaleItemServiceImpl implements SaleItemService{
       
    private final SaleItemRepository saleItemRepository;
    private final MedicineInventoryService medicineInventoryService;

    @Override
    public Long createSaleItem(SaleItemDto saleItemDto) throws HmsException{
   return saleItemRepository.save(saleItemDto.toEntity()).getId();
    }

    @Override 
    public void createMultipleSaleItem(Long saleId , Long medicineId , List<SaleItemDto> saleItemDtos) throws HmsException{
            
        saleItemDtos.stream().map((x) -> {
              x.setSaleId(saleId);
              x.setMedicineId(medicineId);
              return x.toEntity();
        }).forEach(saleItemRepository:: save);
    }

    @Override 
    public void updateSaleItem(SaleItemDto saleItemDto) throws HmsException{
         SaleItem existingSaleItem=saleItemRepository.findById(saleItemDto.getId()).orElseThrow(()-> new HmsException("SALE_ITEM_NOT_FOUND"));
          existingSaleItem.setQuantity(saleItemDto.getQuantity());
          existingSaleItem.setUnitPrice(saleItemDto.getUnitPrice());
          saleItemRepository.save(existingSaleItem);
    }

    @Override 
    public List<SaleItemDto> getSaleItemBySaleId(Long saleId) throws HmsException{
           return saleItemRepository.findBySaleId(saleId).stream().map(SaleItem::toDto).toList();
    }

    @Override 
    public SaleItemDto getSaleItem(Long id) throws HmsException{
          return saleItemRepository.findById(id).map(SaleItem::toDto).orElseThrow(()-> new HmsException("SALE_ITEM_NOT_FOUND"));
    }

    @Override 
    public void createSaleItems(Long saleId , List<SaleItemDto> saleItemDtos) throws HmsException{

      

          saleItemDtos.stream().map((x)->{ x.setSaleId(saleId);
            return x.toEntity();
    }).forEach(saleItemRepository::save);
    }
}
