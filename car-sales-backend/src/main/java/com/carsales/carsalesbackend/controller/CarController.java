package com.carsales.carsalesbackend.controller;

import com.carsales.carsalesbackend.model.Car;
import com.carsales.carsalesbackend.service.CarService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping
    public ResponseEntity<Car> createCar(@Valid @RequestBody Car car) {
        return new ResponseEntity<>(carService.addCar(car), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable String id) {
        return ResponseEntity.ok(carService.getCarById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Car>> searchCars(
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) Double minMileage) {
        return ResponseEntity.ok(carService.searchCars(minPrice, maxPrice, fuelType, minMileage));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable String id, @Valid @RequestBody Car car) {
        return ResponseEntity.ok(carService.updateCar(id, car));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}