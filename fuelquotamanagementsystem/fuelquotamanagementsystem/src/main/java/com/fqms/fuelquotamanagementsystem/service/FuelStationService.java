package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;

public interface FuelStationService {
    void registerFuelStation(FuelStationRegistrationRequestDto request);
}
