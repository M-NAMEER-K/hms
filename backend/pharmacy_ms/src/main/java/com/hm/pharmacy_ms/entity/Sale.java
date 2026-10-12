package com.hm.pharmacy_ms.entity;

import java.time.LocalDateTime;

import com.hm.pharmacy_ms.dto.SaleDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter 
@Getter 
@NoArgsConstructor 
@AllArgsConstructor
@Entity  
public class Sale {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long prescriptionId;
    private String buyerName;
    private String buyerContact;
    private LocalDateTime saleDate;
    private Double totalAmount;

    public Sale(Long id){
        this.id=id;
    }

    public SaleDto toDto(){
        return new SaleDto(id , prescriptionId ,buyerName, buyerContact, saleDate , totalAmount);
    }
}
