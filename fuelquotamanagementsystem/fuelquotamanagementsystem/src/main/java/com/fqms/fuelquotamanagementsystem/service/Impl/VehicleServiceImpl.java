package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.models.Vehicle;
import com.fqms.fuelquotamanagementsystem.models.VehicleOwner;
import com.fqms.fuelquotamanagementsystem.repository.VehicleOwnerRepository;
import com.fqms.fuelquotamanagementsystem.repository.VehicleRepository;
import com.fqms.fuelquotamanagementsystem.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;

    @Override
    public void registerVehicle(VehicleRegistrationRequestDto request) {
        Optional<VehicleOwner> ownerOpt = vehicleOwnerRepository.findById(request.getOwnerId());
        if (!ownerOpt.isPresent()) {
            throw new RuntimeException("Vehicle Owner not found");
        }

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setFuelType(request.getFuelType());
        vehicle.setVehicleOwner(ownerOpt.get());

        vehicleRepository.save(vehicle);
    }
}
