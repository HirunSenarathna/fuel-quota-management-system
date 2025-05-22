package com.fqms.fuelquotamanagementsystem.models.mock;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisteredStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registeredStationId;

    private String licenseNumber;
    private String addressLine1;
    private String addressLine2;
    private String city;
}
