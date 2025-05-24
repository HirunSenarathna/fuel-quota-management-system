package com.fqms.fuelquotamanagementsystem.responses;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FuelOperatorUserResponseDto {
    private int userId;
    private String userName;
    private String password;
    private String role;
    private int operatorId;
    private String fullName;
    private String nic;
    private String contactNo;
}
