package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelPumpRequestDto;
import org.springframework.http.ResponseEntity;

public interface FuelService {

    ResponseEntity<String> processFuelPump(FuelPumpRequestDto request);
    ResponseEntity<?> getVehicleQuota(String vehicleNumber);
}
