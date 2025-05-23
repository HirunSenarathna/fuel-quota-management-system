package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceivedFuelQuantityDto {
    private int stationId;
    private String fuelType;
    private int fuelQuantity;
}
