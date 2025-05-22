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
public class FuelStationOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownerId;

    private String fullName;
    private String nic;
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
