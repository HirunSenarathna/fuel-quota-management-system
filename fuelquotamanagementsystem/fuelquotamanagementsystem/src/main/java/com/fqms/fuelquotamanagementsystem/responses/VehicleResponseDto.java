package com.fqms.fuelquotamanagementsystem.responses;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VehicleResponseDto {
    private int accountId;
    private String username;
    private String password;
    private String role;
    private int vehicleId;
    private String vehicleNumber;
    private String chassisNumber;
    private String vehicleType;
    private String phoneNumber;
    private String fuelType;
    private Double remainingQuotaLimit;
}
