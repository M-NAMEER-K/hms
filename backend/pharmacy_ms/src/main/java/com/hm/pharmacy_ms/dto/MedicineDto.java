package com.hm.pharmacy_ms.dto;


import java.time.LocalDateTime;

import com.hm.pharmacy_ms.entity.MedicineCategory;
import com.hm.pharmacy_ms.entity.MedicineType;
import com.hm.pharmacy_ms.entity.Medicine;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class MedicineDto {
   
     
    private Long id;
    private String name;
    private String dosage;
   
    private MedicineCategory category;

    
    private MedicineType type;
    private String manufacturer;
    private Integer unitPrice;
    private Integer stock;
    private LocalDateTime createdAt;

      public Medicine toEntity(){
          return new Medicine( this.id , this.name, this.dosage, this.category, this.type,this.manufacturer,this.unitPrice,this.stock,this.createdAt);
      }

}