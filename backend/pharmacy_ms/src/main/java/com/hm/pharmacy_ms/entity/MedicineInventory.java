package com.hm.pharmacy_ms.entity;

import java.time.LocalDate;

import com.hm.pharmacy_ms.dto.MedicineInventoryDto;
import com.hm.pharmacy_ms.entity.StockStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

@Entity 
@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 
public class MedicineInventory {
      
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id" , nullable = false)
    private Medicine medicine;
    private String batchNumber;
    private Integer quantity;
    private LocalDate expiryDate;
    private LocalDate addedDate;
    private Integer initialQuantity;
    
    @Enumerated(EnumType.STRING)
    private StockStatus status;

    public MedicineInventoryDto toDto(){
        return new MedicineInventoryDto(id , medicine !=null ? medicine.getId() : null , batchNumber , quantity , 
    expiryDate , addedDate ,initialQuantity,status);
    }
    

}
