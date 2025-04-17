package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleOwnerRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.service.VehicleOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vehicle-owner")
public class VehicleOwnerController {

    @Autowired
    private VehicleOwnerService vehicleOwnerService;

    @PostMapping("/register")
    public ResponseEntity<String> registerVehicleOwner(@RequestBody VehicleOwnerRegistrationRequestDto request) {
        vehicleOwnerService.registerVehicleOwner(request);
        return ResponseEntity.ok("Vehicle Owner Registered Successfully!");
    }
}
