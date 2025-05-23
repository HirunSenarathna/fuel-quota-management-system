package com.fqms.fuelquotamanagementsystem.Dtos;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FuelOperatorDto {
    private String username;
    private String password;
    private String fullName;
    private String nic;
    private String contactNo;
    private int StationOwnerId;
}
