package com.carsales.carsalesbackend.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sales")
public class Sale {

    @Id
    private String id;

    @NotBlank(message = "Car ID is required")
    private String carId;

    @NotBlank(message = "Customer ID is required")
    private String customerId;

    @NotNull(message = "Sale price is required")
    @Positive(message = "Sale price must be positive")
    private Double salePrice;

    @NotNull(message = "Sale date is required")
    private LocalDate saleDate = LocalDate.now();

    @NotBlank(message = "Payment mode is required")
    private String paymentMode; // CASH, FINANCED, ONLINE
}