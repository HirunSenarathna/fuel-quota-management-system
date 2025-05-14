package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {}
