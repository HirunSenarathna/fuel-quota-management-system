package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
    Optional<Vehicle> findByVehicleNumberAndChassisNumber(String vehicleNumber, String chassisNumber);

    Optional<Vehicle> findByUsernameIgnoreCase(String username);
}
