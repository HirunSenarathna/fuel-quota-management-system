package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;

import java.util.List;

public interface FuelStationService {
    String registerFuelStation(FuelStationRegistrationRequestDto request);

    List<String> getCitiesOfStation();
}
