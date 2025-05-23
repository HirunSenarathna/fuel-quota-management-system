package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelOperatorDto;
import com.fqms.fuelquotamanagementsystem.Dtos.response.FuelOperatorResponseDto;
import com.fqms.fuelquotamanagementsystem.models.system.FuelOperator;
import com.fqms.fuelquotamanagementsystem.service.FuelOperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all")
    @PreAuthorize( "hasAnyRole('ROLE_FUEL_STATION_OWNER')")
    public List<FuelOperatorResponseDto> getAllFuelOperators(@RequestParam int stationId) {
        return fuelOperatorService.getAllFuelOperators(stationId);
    }
}
