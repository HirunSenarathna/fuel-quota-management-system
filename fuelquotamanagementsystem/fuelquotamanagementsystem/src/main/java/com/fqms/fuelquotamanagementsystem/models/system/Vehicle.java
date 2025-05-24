package com.fqms.fuelquotamanagementsystem.models.system;

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
    private String chassisNumber;
    private String vehicleType;
    private String fuelType;
    private String phone;
    private Double remainingQuotaLimit;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
