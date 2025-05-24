package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FuelPumpRequestDto {

    private String vehicleNumber;
    private String chassisNumber;
    private double pumpedAmount;
    private int operatorId;
    private int stationId;
    private String fuelType;
}
