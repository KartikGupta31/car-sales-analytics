package com.carsales.carsalesbackend.repository;

import com.carsales.carsalesbackend.model.Sale;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SaleRepository extends MongoRepository<Sale, String> {

    List<Sale> findByCarId(String carId);

    List<Sale> findByCustomerId(String customerId);

    List<Sale> findBySaleDateBetween(LocalDate startDate, LocalDate endDate);
}