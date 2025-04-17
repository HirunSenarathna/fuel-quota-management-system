package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleOwnerRegistrationRequestDto;

public interface VehicleOwnerService {
    void registerVehicleOwner(VehicleOwnerRegistrationRequestDto request);
}
