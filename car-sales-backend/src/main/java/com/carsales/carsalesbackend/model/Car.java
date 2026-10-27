package com.carsales.carsalesbackend.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cars")
public class Car {

    @Id
    private String id;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 2000, message = "Year must be 2000 or later")
    private Integer year;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    @NotBlank(message = "Fuel type is required")
    private String fuelType; // PETROL, DIESEL, ELECTRIC, HYBRID

    @NotNull(message = "Mileage is required")
    @Positive(message = "Mileage must be positive")
    private Double mileage;

    @NotBlank(message = "Transmission is required")
    private String transmission; // MANUAL, AUTOMATIC

    @NotNull(message = "Seating capacity is required")
    @Min(value = 2, message = "Minimum seating capacity is 2")
    private Integer seatingCapacity;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity cannot be negative")
    private Integer stockQuantity = 1;

    private Boolean isAvailable = true;
}