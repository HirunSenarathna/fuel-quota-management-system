package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StationFuelQuantityDto {
    private int stationId;
    private String fuelType;
}
