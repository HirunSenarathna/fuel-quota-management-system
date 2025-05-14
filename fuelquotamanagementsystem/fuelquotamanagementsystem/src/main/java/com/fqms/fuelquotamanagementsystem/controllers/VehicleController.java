package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/register")
    public ResponseEntity<byte[]> registerVehicle(@RequestBody VehicleRegistrationRequestDto request) {
        return vehicleService.registerVehicle(request);
    }
}
