package com.hm.pharmacy_ms.dto;

import java.time.LocalDate;

import com.hm.pharmacy_ms.entity.MedicineInventory;
import com.hm.pharmacy_ms.entity.Medicine;
import com.hm.pharmacy_ms.entity.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class MedicineInventoryDto {
    
    private Long id;
     private Long medicineId;
    private String batchNumber;
    private Integer quantity;
    private LocalDate expiryDate;
    private LocalDate addedDate;
    private Integer initialQuantity;
    private StockStatus status;

    



public MedicineInventory toEntity(){
        return  new MedicineInventory(this.id, new Medicine(medicineId),this.batchNumber,
        this.quantity,this.expiryDate,this.addedDate , this.initialQuantity,this.status);
    }
}
