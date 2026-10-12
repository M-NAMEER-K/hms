package com.hm.pharmacy_ms.service;

import java.util.List;

import com.hm.pharmacy_ms.dto.SaleDto;
import com.hm.pharmacy_ms.dto.SaleRequestDto;
import com.hm.pharmacy_ms.exception.HmsException;

public interface SaleService {
       public Long createSale(SaleRequestDto dto) throws HmsException;
       public void updateSale(SaleDto dto) throws HmsException;
       public SaleDto getSale(Long id) throws HmsException;
       public SaleDto getSaleByPrescriptionId(Long prescriptionId) throws HmsException;
       public List<SaleDto> getAllSales() throws HmsException;
}
