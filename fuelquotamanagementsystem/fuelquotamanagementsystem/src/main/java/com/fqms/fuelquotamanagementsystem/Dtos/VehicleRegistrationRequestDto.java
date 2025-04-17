package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleRegistrationRequestDto {
    private String vehicleNumber;
    private String vehicleType;
    private String fuelType;
    private String chassisNumber;
    private int ownerId;
}
