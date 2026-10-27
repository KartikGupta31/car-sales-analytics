package com.carsales.carsalesbackend.repository;

import com.carsales.carsalesbackend.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {

    Optional<Customer> findByEmail(String email);
}