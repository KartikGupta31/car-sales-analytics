package com.carsales.carsalesbackend.controller;

import com.carsales.carsalesbackend.model.Sale;
import com.carsales.carsalesbackend.service.SaleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping
    public ResponseEntity<Sale> recordSale(@Valid @RequestBody Sale sale) {
        return new ResponseEntity<>(saleService.recordSale(sale), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.ok(saleService.getAllSales());
    }
}