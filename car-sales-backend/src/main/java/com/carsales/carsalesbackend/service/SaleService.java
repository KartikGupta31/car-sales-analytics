package com.carsales.carsalesbackend.service;

import com.carsales.carsalesbackend.model.Car;
import com.carsales.carsalesbackend.model.Sale;
import com.carsales.carsalesbackend.repository.CarRepository;
import com.carsales.carsalesbackend.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private CarRepository carRepository;

    public Sale recordSale(Sale sale) {
        Car car = carRepository.findById(sale.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + sale.getCarId()));

        if (car.getStockQuantity() <= 0) {
            throw new RuntimeException("Car is out of stock!");
        }

        car.setStockQuantity(car.getStockQuantity() - 1);
        if (car.getStockQuantity() == 0) {
            car.setIsAvailable(false);
        }
        carRepository.save(car);

        return saleRepository.save(sale);
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }
}