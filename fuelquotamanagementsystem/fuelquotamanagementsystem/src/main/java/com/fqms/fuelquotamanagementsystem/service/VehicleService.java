package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleRegistrationRequestDto;
import org.springframework.http.ResponseEntity;

public interface VehicleService {
    ResponseEntity<byte[]> registerVehicle(VehicleRegistrationRequestDto request);
}
