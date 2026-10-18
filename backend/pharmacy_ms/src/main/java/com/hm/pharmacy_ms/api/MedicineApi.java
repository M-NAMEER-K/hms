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
import com.hm.pharmacy_ms.dto.MedicineDto;
import com.hm.pharmacy_ms.dto.ResponseDto;
import com.hm.pharmacy_ms.exception.HmsException;
import com.hm.pharmacy_ms.service.MedicineService;

import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/pharmacy/medicine")
@RequiredArgsConstructor 
 public class MedicineApi{

   private final MedicineService medicineService;

   @PostMapping("/add")
   public ResponseEntity<Long> addMedicine(@RequestBody MedicineDto medicineDto) throws HmsException{
    return new ResponseEntity<>(medicineService.addMedicine(medicineDto),HttpStatus.CREATED);
   }

   @PutMapping("/get/{id}")
   public ResponseEntity<MedicineDto> getMedicineById(@PathVariable Long id) throws HmsException{
   return new ResponseEntity<>(medicineService.getMedicineById(id),HttpStatus.OK);
   }

   @PutMapping("/update")
   public ResponseEntity<ResponseDto> updateMedicine(@RequestBody MedicineDto medicineDto) throws HmsException{
       medicineService.updateMedicine(medicineDto);
        return new ResponseEntity<>(new ResponseDto("Medicine Updated"),HttpStatus.OK);
   }

   @GetMapping("/getAll")
   public ResponseEntity<Page<MedicineDto>>getAllMedicines(  @RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="5") int size) throws HmsException{
       return new ResponseEntity<>(medicineService.getAllMedicines(page,size),HttpStatus.OK);
   }

   }