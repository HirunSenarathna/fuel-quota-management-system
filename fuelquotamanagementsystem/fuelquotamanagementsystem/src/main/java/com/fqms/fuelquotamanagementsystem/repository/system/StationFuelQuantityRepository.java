package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.StationFuelQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationFuelQuantityRepository extends JpaRepository<StationFuelQuantity, Integer> {
    StationFuelQuantity findByStationIdAndFuelType(int stationId, String fuelType);
}
