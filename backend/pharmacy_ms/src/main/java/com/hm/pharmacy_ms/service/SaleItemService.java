package com.hm.pharmacy_ms.service;

import java.util.List;

import com.hm.pharmacy_ms.dto.SaleItemDto;
import com.hm.pharmacy_ms.exception.HmsException;

public interface SaleItemService {
        Long createSaleItem(SaleItemDto saleItemDto) throws HmsException;
        void createSaleItems(Long saleId , List<SaleItemDto> saleItemDtos) throws HmsException;
        void createMultipleSaleItem(Long saleId,Long medicineId , List<SaleItemDto> saleItemDtos) throws HmsException;
        void updateSaleItem(SaleItemDto saleItemDto ) throws HmsException;
        List<SaleItemDto> getSaleItemBySaleId(Long saleId) throws HmsException;
        SaleItemDto getSaleItem(Long id) throws HmsException;
}
