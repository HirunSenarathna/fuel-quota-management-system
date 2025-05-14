package com.fqms.fuelquotamanagementsystem.repository.mock;

import com.fqms.fuelquotamanagementsystem.models.mock.RegisteredVehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisteredVehicleRepository extends JpaRepository<RegisteredVehicle, Integer> {
    Optional<Object> findByVehicleNumberAndChassisNumber(String vehicle_number, String chassis_number);
}
