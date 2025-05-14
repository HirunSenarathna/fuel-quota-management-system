package com.fqms.fuelquotamanagementsystem.repository.mock;

import com.fqms.fuelquotamanagementsystem.models.mock.RegisteredStation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisteredStationRepository extends JpaRepository<RegisteredStation, Integer> {
    Optional<Object> findByLicenseNumberAndCity(String licenseNumber, String city);
}
