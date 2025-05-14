package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fuel-station")
public class FuelStationController {

    @Autowired
    private FuelStationService fuelStationService;

    @PostMapping("/register")
    public String registerFuelStation(@RequestBody FuelStationRegistrationRequestDto request) {
        return fuelStationService.registerFuelStation(request);
    }
}

