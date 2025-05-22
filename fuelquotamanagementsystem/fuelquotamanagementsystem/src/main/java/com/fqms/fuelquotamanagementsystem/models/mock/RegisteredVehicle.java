package com.fqms.fuelquotamanagementsystem.models.mock;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisteredVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registeredVehicleId;

    private String vehicleNumber;
    private String chassisNumber;
    private String vehicleType;
    private String fuelType;
    private Double remainingQuotaLimit;
}
