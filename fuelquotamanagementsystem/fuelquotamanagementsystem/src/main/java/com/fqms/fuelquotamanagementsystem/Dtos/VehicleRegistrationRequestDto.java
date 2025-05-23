package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleRegistrationRequestDto {
    private String username;
    private String password;
    private String vehicleNumber;
    private String chassisNumber;
    private String vehicleType;
    private String fuelType;
}
