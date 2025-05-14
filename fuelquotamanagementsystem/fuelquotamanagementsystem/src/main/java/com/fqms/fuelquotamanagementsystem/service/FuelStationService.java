package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;
import org.springframework.http.ResponseEntity;

public interface FuelStationService {
    String registerFuelStation(FuelStationRegistrationRequestDto request);
}
