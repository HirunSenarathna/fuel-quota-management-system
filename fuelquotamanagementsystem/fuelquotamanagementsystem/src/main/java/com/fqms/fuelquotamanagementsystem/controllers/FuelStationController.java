package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fuel-station")
public class FuelStationController {

    @Autowired
    private FuelStationService fuelStationService;

    @PostMapping("/register")
    public String registerFuelStation(@RequestBody FuelStationRegistrationRequestDto request) {
        return fuelStationService.registerFuelStation(request);
    }

    @GetMapping("/cities")
    public List<String> getCitiesOfStation() {
        return fuelStationService.getCitiesOfStation();
    }
}

