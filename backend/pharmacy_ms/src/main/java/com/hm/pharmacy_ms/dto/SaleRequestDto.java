package com.hm.pharmacy_ms.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 
public class SaleRequestDto {
        
    private Long prescriptionId;
    private String buyerName;
    private String buyerContact;
    private Double totalAmount;
    private List<SaleItemDto> saleItems;
}
