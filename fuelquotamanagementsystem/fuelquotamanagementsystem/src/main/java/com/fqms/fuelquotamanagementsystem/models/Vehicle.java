package com.fqms.fuelquotamanagementsystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleId;

    private String vehicleNumber;
    private String vehicleType;
    private String fuelType;
    private Double quotaLimit;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private VehicleOwner vehicleOwner;
}
