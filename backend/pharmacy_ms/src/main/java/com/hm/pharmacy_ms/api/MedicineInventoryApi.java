package com.hm.pharmacy_ms.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import com.hm.pharmacy_ms.dto.MedicineInventoryDto;
import com.hm.pharmacy_ms.entity.MedicineInventory;
import com.hm.pharmacy_ms.exception.HmsException;
import com.hm.pharmacy_ms.service.MedicineInventoryService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@RequiredArgsConstructor 
@RestController 
@RequestMapping("/pharmacy/inventory")
public class MedicineInventoryApi {
       
    private final MedicineInventoryService medicineInventoryService;

    @PostMapping("/add")
    public ResponseEntity<MedicineInventoryDto> addMedicine(@RequestBody  MedicineInventoryDto medicineDto) throws HmsException{
          return new ResponseEntity<>(medicineInventoryService.addMedicine(medicineDto),HttpStatus.CREATED);
    }

    @PutMapping("/update")
      public ResponseEntity<MedicineInventoryDto> updateMedicine(@RequestBody MedicineInventoryDto medicineDto) throws HmsException{
       return new ResponseEntity<>(medicineInventoryService.updateMedicine(medicineDto),HttpStatus.OK);
      }

      @GetMapping("/get/{id}")
      public ResponseEntity<MedicineInventoryDto> getMedicineById(@PathVariable Long id) throws HmsException{
        return new ResponseEntity<>(medicineInventoryService.getMedicineById(id),HttpStatus.OK);
      }

      @GetMapping("/getAll")
       public ResponseEntity<Page<MedicineInventoryDto>> getAllMedicines(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="5") int size) throws HmsException{
            return new ResponseEntity<>(medicineInventoryService.getAllMedicines(page,size),HttpStatus.OK);
       }
}
