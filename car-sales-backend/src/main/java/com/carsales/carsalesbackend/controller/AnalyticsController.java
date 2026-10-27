package com.carsales.carsalesbackend.controller;

import com.carsales.carsalesbackend.dto.BrandSalesDTO;
import com.carsales.carsalesbackend.dto.DashboardSummaryDTO;
import com.carsales.carsalesbackend.dto.FuelTypeSalesDTO;
import com.carsales.carsalesbackend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getSummary() {
        return ResponseEntity.ok(analyticsService.getDashboardSummary());
    }

    @GetMapping("/fuel-distribution")
    public ResponseEntity<List<FuelTypeSalesDTO>> getFuelTypeDistribution() {
        return ResponseEntity.ok(analyticsService.getFuelTypeDistribution());
    }

    @GetMapping("/brand-sales")
    public ResponseEntity<List<BrandSalesDTO>> getBrandSales() {
        return ResponseEntity.ok(analyticsService.getBrandSales());
    }
}