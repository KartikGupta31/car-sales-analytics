package com.carsales.carsalesbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDTO {
    private Double totalRevenue;
    private Long totalCarsSold;
    private Long totalCustomers;
    private Long totalAvailableCars;
}