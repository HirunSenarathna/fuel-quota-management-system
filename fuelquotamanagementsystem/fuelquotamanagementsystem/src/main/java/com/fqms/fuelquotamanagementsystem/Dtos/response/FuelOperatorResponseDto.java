package com.fqms.fuelquotamanagementsystem.Dtos.response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FuelOperatorResponseDto {
    private String fullName;
    private String nic;
    private String contactNo;
    private String username;
}
