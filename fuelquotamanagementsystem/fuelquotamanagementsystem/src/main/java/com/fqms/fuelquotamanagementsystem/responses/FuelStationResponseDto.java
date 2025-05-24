package com.fqms.fuelquotamanagementsystem.responses;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FuelStationResponseDto {
    private int stationId;
    private String licenseNumber;
    private String city;
    private String ownerName;
    private String phoneNumber;
}
