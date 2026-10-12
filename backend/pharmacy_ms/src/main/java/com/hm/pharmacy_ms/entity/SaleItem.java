package com.hm.pharmacy_ms.entity;

import com.hm.pharmacy_ms.dto.SaleItemDto;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity 
public class SaleItem {
    
      @Id 
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      

      @ManyToOne(fetch = FetchType.LAZY)
      @JoinColumn(name="sale_id" ,nullable=false)      
      private Sale sale;
     
      @ManyToOne(fetch = FetchType.LAZY)
      @JoinColumn(name="medicine_id" ,nullable=false)
      private Medicine medicine;

      private String batchNumber;
      private Integer quantity;
      private Double unitPrice;
     
      public SaleItemDto toDto(){
         return new SaleItemDto(id , sale!=null?sale.getId():null,medicine!=null?medicine.getId():null,
          batchNumber , quantity , unitPrice);
      }
}
