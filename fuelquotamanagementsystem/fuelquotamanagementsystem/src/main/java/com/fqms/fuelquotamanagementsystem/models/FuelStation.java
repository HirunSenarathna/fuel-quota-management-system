package com.fqms.fuelquotamanagementsystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FuelStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stationId;

    private String stationName;
    private String location;
    private String fuelTypesAvailable;
    private String licenseNumber;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private FuelStationOwner stationOwner;
}
