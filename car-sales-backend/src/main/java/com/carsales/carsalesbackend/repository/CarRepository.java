package com.carsales.carsalesbackend.repository;

import com.carsales.carsalesbackend.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends MongoRepository<Car, String> {

    List<Car> findByBrandIgnoreCase(String brand);

    List<Car> findByFuelTypeIgnoreCase(String fuelType);

    @Query("{ 'price': { $gte: ?0, $lte: ?1 }, 'fuelType': { $regex: ?2, $options: 'i' }, 'mileage': { $gte: ?3 } }")
    List<Car> filterCars(Double minPrice, Double maxPrice, String fuelType, Double minMileage);
}