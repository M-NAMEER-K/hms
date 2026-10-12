package com.hm.pharmacy_ms.dto;

import com.hm.pharmacy_ms.entity.Medicine;
import com.hm.pharmacy_ms.entity.Sale;
import com.hm.pharmacy_ms.entity.SaleItem;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 
public class SaleItemDto {
       
      private Long id;

      private Long saleId;
      private Long medicineId;
      private String batchNumber;
      private Integer quantity;
      private Double unitPrice;

      public SaleItem toEntity(){
        return new SaleItem(id, new Sale(saleId), new Medicine(medicineId) , batchNumber , quantity , unitPrice);
      }
}
