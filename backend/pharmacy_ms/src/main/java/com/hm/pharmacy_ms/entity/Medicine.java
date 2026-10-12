package com.hm.pharmacy_ms.entity;


import java.time.LocalDateTime;

import com.hm.pharmacy_ms.dto.MedicineDto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 
public class Medicine {
      
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String dosage;
     @Enumerated(EnumType.STRING)
    private MedicineCategory category;

     @Enumerated(EnumType.STRING)
    private MedicineType type;
    private String manufacturer;
    private Integer unitPrice;
    private Integer stock;
    private LocalDateTime createdAt;




  public Medicine(Long id){
      this.id=id;
  }

  public MedicineDto toDto(){
    return new MedicineDto(id,name,dosage,category,type,manufacturer,unitPrice,stock,createdAt);
  }

}
