package com.fqms.fuelquotamanagementsystem.models.system;

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

    private String licenseNumber;
    private String addressLine1;
    private String addressLine2;
    private String city;


    @ManyToOne
    @JoinColumn(name = "owner_id")
    private FuelStationOwner stationOwner;
}
