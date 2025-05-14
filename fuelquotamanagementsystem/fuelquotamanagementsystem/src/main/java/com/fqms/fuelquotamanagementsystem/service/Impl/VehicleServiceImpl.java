package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.models.Vehicle;
import com.fqms.fuelquotamanagementsystem.repository.VehicleRepository;
import com.fqms.fuelquotamanagementsystem.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public void registerVehicle(VehicleRegistrationRequestDto request) {

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setChassisNumber(request.getChassisNumber());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setFuelType(request.getFuelType());
        vehicle.setRemainingQuotaLimit(20.00);

        vehicleRepository.save(vehicle);
    }
}
