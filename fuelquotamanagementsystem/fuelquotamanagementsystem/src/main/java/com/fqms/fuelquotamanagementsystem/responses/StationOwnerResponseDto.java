package com.fqms.fuelquotamanagementsystem.responses;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StationOwnerResponseDto {
    private int id;
    private String username;
    private String password;
    private String role;
    private int ownerId;
    private String nic;
    private String fullName;
    private String phoneNumber;
}
