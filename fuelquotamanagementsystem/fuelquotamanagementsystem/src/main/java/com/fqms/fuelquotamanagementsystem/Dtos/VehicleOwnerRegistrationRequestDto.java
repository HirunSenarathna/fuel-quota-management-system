package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleOwnerRegistrationRequestDto {
    // Account Info
    private String username;
    private String password;
    private String email;

    // Vehicle Owner Info
    private String fullName;
    private String nic;
    private String phoneNumber;
    private String address;
}
