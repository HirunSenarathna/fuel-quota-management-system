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
public class VehicleOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownerId;

    private String fullName;
    private String nic;
    private String address;
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}