package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.FuelStation;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStationOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
    FuelStation findByStationOwner(Optional<FuelStationOwner> stationOwner);

    boolean existsFuelStationByLicenseNumberAndCity(String licenseNumber, String city);
}