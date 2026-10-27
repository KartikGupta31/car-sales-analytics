package com.carsales.carsalesbackend.service;

import com.carsales.carsalesbackend.dto.BrandSalesDTO;
import com.carsales.carsalesbackend.dto.DashboardSummaryDTO;
import com.carsales.carsalesbackend.dto.FuelTypeSalesDTO;
import com.carsales.carsalesbackend.model.Car;
import com.carsales.carsalesbackend.model.Customer;
import com.carsales.carsalesbackend.model.Sale;
import com.carsales.carsalesbackend.repository.CarRepository;
import com.carsales.carsalesbackend.repository.CustomerRepository;
import com.carsales.carsalesbackend.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class AnalyticsService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public DashboardSummaryDTO getDashboardSummary() {
        List<Sale> allSales = saleRepository.findAll();
        Double totalRevenue = allSales.stream().mapToDouble(Sale::getSalePrice).sum();
        long totalCarsSold = allSales.size();
        long totalCustomers = customerRepository.count();
        long totalAvailableCars = carRepository.findAll().stream()
                .filter(car -> Boolean.TRUE.equals(car.getIsAvailable()))
                .count();

        return new DashboardSummaryDTO(totalRevenue, totalCarsSold, totalCustomers, totalAvailableCars);
    }

    public List<FuelTypeSalesDTO> getFuelTypeDistribution() {
        GroupOperation groupOperation = group("fuelType").count().as("count");
        ProjectionOperation projectionOperation = project("count").and("_id").as("fuelType");

        Aggregation aggregation = newAggregation(groupOperation, projectionOperation);

        return mongoTemplate.aggregate(aggregation, Car.class, FuelTypeSalesDTO.class).getMappedResults();
    }

    public List<BrandSalesDTO> getBrandSales() {
        GroupOperation groupOperation = group("brand").count().as("count");
        ProjectionOperation projectionOperation = project("count").and("_id").as("brand");

        Aggregation aggregation = newAggregation(groupOperation, projectionOperation);

        return mongoTemplate.aggregate(aggregation, Car.class, BrandSalesDTO.class).getMappedResults();
    }
}