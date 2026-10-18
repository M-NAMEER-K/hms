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
import com.hm.pharmacy_ms.dto.ResponseDto;
import com.hm.pharmacy_ms.dto.SaleDto;
import com.hm.pharmacy_ms.dto.SaleItemDto;
import com.hm.pharmacy_ms.dto.SaleRequestDto;
import com.hm.pharmacy_ms.exception.HmsException;
import com.hm.pharmacy_ms.service.SaleItemService;
import com.hm.pharmacy_ms.service.SaleService;

import lombok.RequiredArgsConstructor;

@RestController  
@RequestMapping ("/pharmacy/sales")
@RequiredArgsConstructor 
public class SaleApi {
       private final SaleService saleService;
       private final SaleItemService saleItemService;

       @PostMapping("/create")
       public ResponseEntity<Long> createSale(@RequestBody SaleRequestDto dto) throws HmsException{
      return new ResponseEntity<>(saleService.createSale(dto) , HttpStatus.CREATED);
       }

       @PutMapping("/update")
       public ResponseEntity<ResponseDto> updateSale(@RequestBody SaleDto dto) throws HmsException{
         return new ResponseEntity<>(new ResponseDto("Sale updated successfully"),HttpStatus.OK);
       }

       @GetMapping("/getSaleItem/{saleId}")
       public ResponseEntity<List<SaleItemDto>> getSaleItem(@PathVariable  Long saleId) throws HmsException{
     List<SaleItemDto> saleItem=saleItemService.getSaleItemBySaleId(saleId);
     return new ResponseEntity<>(saleItem,HttpStatus.OK);
       }

       @GetMapping("/get/{id}")
       public ResponseEntity<SaleDto> getSale(@PathVariable  Long id) throws HmsException{
        SaleDto sale=saleService.getSale(id);
       return new ResponseEntity<>(sale , HttpStatus.OK);
           
       }

       @GetMapping("/getAll")
       public ResponseEntity<Page<SaleDto>> getAllSales(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="5") int size) throws HmsException{
          Page<SaleDto> sales=saleService.getAllSales(page,size);
          return new ResponseEntity<>(sales,HttpStatus.OK);
       }
}
