package com.carsales.carsalesbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuelTypeSalesDTO {
    private String fuelType;
    private Long count;
}