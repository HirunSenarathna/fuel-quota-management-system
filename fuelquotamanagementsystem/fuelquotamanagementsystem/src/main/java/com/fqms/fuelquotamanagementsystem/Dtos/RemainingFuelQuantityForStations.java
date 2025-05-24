package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RemainingFuelQuantityForStations {
    private int stationId;
    private String city;
    private String LicenseNumber;
    private String ownerName;
    private String phoneNumber;
    private int stationFuelQuantity;
}
