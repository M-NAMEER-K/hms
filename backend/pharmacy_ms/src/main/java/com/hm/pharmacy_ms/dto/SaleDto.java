package com.hm.pharmacy_ms.dto;

import java.time.LocalDateTime;

import com.hm.pharmacy_ms.entity.Sale;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter
public class SaleDto {
      
       private Long id;

    private Long prescriptionId;
    private String buyerName;
    private String buyerContact;
    private LocalDateTime saleDate;
    private Double totalAmount;

    public Sale toEntity(){
         return new Sale(id , prescriptionId,buyerName,buyerContact , saleDate , totalAmount);
    }
}
