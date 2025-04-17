package com.fqms.fuelquotamanagementsystem.repository;

import com.fqms.fuelquotamanagementsystem.models.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {}
