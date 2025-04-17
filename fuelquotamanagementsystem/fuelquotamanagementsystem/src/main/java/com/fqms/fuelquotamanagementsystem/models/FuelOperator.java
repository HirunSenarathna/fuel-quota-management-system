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
public class FuelOperator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int operatorId;

    private String fullName;
    private String nic;
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private FuelStation station;
}
