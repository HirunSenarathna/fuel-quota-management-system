package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelOperatorDto;
import com.fqms.fuelquotamanagementsystem.service.FuelOperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fuel-operator")
public class FuelOperatorController {
    @Autowired
    private FuelOperatorService fuelOperatorService;

    @PostMapping("/register")
    @PreAuthorize( "hasAnyRole('ROLE_FUEL_STATION_OWNER')")
    public String registerFuelOperator(@RequestBody FuelOperatorDto fuelOperatorDto) {
        return fuelOperatorService.registerFuelOperator(fuelOperatorDto);
    }
}
