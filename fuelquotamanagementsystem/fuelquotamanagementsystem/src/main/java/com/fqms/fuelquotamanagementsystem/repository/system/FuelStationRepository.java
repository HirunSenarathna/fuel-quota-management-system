package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.Dtos.RemainingFuelQuantityForStations;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStation;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStationOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
    FuelStation findByStationOwner(Optional<FuelStationOwner> stationOwner);

    boolean existsFuelStationByLicenseNumberAndCity(String licenseNumber, String city);

    @Query("SELECT new com.fqms.fuelquotamanagementsystem.Dtos.RemainingFuelQuantityForStations(" +
            "fs.stationId, fs.city, fs.licenseNumber, o.fullName, o.phoneNumber, COALESCE(sfq.fuelQuantity, 0)) " +
            "FROM FuelStation fs " +
            "JOIN fs.stationOwner o " +
            "LEFT JOIN StationFuelQuantity sfq ON fs.stationId = sfq.stationId")
    List<RemainingFuelQuantityForStations> getRemainingFuelDetailsForAllStations();
}