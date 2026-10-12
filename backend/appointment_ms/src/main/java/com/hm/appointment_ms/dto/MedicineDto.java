package com.hm.appointment_ms.dto;

import com.hm.appointment_ms.entity.Medicine;
import com.hm.appointment_ms.entity.Prescription;

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
      private String medicineId;
      private String dosage;
      private String frequency;
      private Integer duration;
      private String route;
      private String type;
      private String instructions;
      private Long prescriptionId;

      public Medicine toEntity(){
           return new Medicine(this.id , this.name , this.medicineId , this.dosage , this.frequency , this.duration , 
            this.route , this.type , this.instructions , new Prescription(prescriptionId)
           );
      }
}
