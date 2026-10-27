package com.carsales.carsalesbackend.service;

import com.carsales.carsalesbackend.model.Car;
import com.carsales.carsalesbackend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car getCarById(String id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + id));
    }

    public List<Car> searchCars(Double minPrice, Double maxPrice, String fuelType, Double minMileage) {
        Double minP = (minPrice != null) ? minPrice : 0.0;
        Double maxP = (maxPrice != null) ? maxPrice : Double.MAX_VALUE;
        String fuel = (fuelType != null && !fuelType.trim().isEmpty()) ? fuelType : ".*";
        Double minM = (minMileage != null) ? minMileage : 0.0;

        return carRepository.filterCars(minP, maxP, fuel, minM);
    }

    public Car updateCar(String id, Car updatedCar) {
        Car existingCar = getCarById(id);
        existingCar.setBrand(updatedCar.getBrand());
        existingCar.setModel(updatedCar.getModel());
        existingCar.setYear(updatedCar.getYear());
        existingCar.setPrice(updatedCar.getPrice());
        existingCar.setFuelType(updatedCar.getFuelType());
        existingCar.setMileage(updatedCar.getMileage());
        existingCar.setTransmission(updatedCar.getTransmission());
        existingCar.setSeatingCapacity(updatedCar.getSeatingCapacity());
        existingCar.setStockQuantity(updatedCar.getStockQuantity());
        existingCar.setIsAvailable(updatedCar.getIsAvailable());
        return carRepository.save(existingCar);
    }

    public void deleteCar(String id) {
        carRepository.deleteById(id);
    }
}