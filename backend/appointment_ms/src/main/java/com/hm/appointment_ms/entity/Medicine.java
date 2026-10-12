package com.hm.appointment_ms.entity;

import com.hm.appointment_ms.dto.MedicineDto;

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
@Entity 
@NoArgsConstructor 
@AllArgsConstructor 
public class Medicine {
       
     @Id 
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String name;
     private String medicineId;
     private String dosage;
     private String frequency;
     private Integer duration;
     private String type;
     private String route;
     private String instructions;

     @ManyToOne(fetch=FetchType.LAZY)
     @JoinColumn(name="prescription_id")
     private Prescription prescription;
   
       public MedicineDto toDto(){
           return new MedicineDto(this.id , this.name , this.medicineId , this.dosage , this.frequency , this.duration , 
            this.route , this.type , this.instructions , prescription.getId()
           );
      }
}
