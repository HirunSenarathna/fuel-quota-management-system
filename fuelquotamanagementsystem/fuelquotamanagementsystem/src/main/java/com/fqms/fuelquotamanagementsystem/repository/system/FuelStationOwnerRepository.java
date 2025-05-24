package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.FuelStationOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FuelStationOwnerRepository extends JpaRepository<FuelStationOwner, Integer> {
    Optional<FuelStationOwner> findByAccountId(int id);
}
