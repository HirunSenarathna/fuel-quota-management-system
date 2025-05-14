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

    // Fuel Station Owner info
    private String fullName;
    private String nic;
    private String phoneNumber;

    // Fuel Station info
    private String licenseNumber;
    private String addressLine1;
    private String addressLine2;
    private String city;

}
