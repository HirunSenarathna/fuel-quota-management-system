package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleRegistrationRequestDto;

public interface VehicleService {
    void registerVehicle(VehicleRegistrationRequestDto request);
}
