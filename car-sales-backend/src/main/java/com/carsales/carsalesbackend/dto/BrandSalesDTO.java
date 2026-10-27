package com.carsales.carsalesbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandSalesDTO {
    private String brand;
    private Long count;
}