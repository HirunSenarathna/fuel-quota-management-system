package com.fqms.fuelquotamanagementsystem.repository.mock;

import com.fqms.fuelquotamanagementsystem.models.mock.RegisteredStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RegisteredStationRepository extends JpaRepository<RegisteredStation, Integer> {
    Optional<Object> findByLicenseNumberAndCity(String licenseNumber, String city);

    @Query("SELECT DISTINCT rs.city FROM RegisteredStation rs")
    List<String> getAllCities();
}
