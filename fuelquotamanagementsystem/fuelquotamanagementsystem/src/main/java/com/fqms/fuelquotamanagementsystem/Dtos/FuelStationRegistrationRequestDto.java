package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FuelStationRegistrationRequestDto {

    // Account info
    private String username;
    private String password;
    private String email;

    // Fuel Station Owner info
    private String fullName;
    private String nic;
    private String phoneNumber;
    private String address;

    // Fuel Station info
    private String stationName;
    private String location;
    private String fuelTypesAvailable;
    private String licenseNumber;
}
