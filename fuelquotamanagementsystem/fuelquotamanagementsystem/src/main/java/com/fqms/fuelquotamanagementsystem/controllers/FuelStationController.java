package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.Dtos.ReceivedFuelQuantityDto;
import com.fqms.fuelquotamanagementsystem.Dtos.StationFuelQuantityDto;
import com.fqms.fuelquotamanagementsystem.responses.FuelStationResponseDto;
import com.fqms.fuelquotamanagementsystem.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fuel-station")
public class FuelStationController {

    @Autowired
    private FuelStationService fuelStationService;

    // Registers a new fuel station along with its owner.
    @PostMapping("/register")
    public String registerFuelStation(@RequestBody FuelStationRegistrationRequestDto request) {
        return fuelStationService.registerFuelStation(request);
    }

    // Retrieves a list of all unique cities where fuel stations are located.
    @GetMapping("/cities")
    public List<String> getCitiesOfStation() {
        return fuelStationService.getCitiesOfStation();
    }

    // Retrieves a list of all fuel stations with their details.
    @GetMapping("/all")
    public List<FuelStationResponseDto> getAllFuelStations() {
        return fuelStationService.getFuelStationService();
    }

    // Save the received fuel quantity in the database
    @PostMapping("/receivedFuelQuantity")
    @PreAuthorize( "hasAnyRole('ROLE_FUEL_STATION_OWNER')")
    public String setReceivedFuelQuantity(@RequestBody ReceivedFuelQuantityDto receivedFuelQuantityDto){
        System.out.println("Received data: " +
                receivedFuelQuantityDto.getStationId() + " " +
                receivedFuelQuantityDto.getFuelType() + " " +
                receivedFuelQuantityDto.getFuelQuantity());
        return fuelStationService.setReceivedFuelQuantity(receivedFuelQuantityDto);
    }

    // get the remaining fuel quantity of a station
    @PostMapping("/remainingFuelQuantity")
    @PreAuthorize( "hasAnyRole('ROLE_FUEL_STATION_OWNER')")
    public int getRemainingFuelQuantity(@RequestBody StationFuelQuantityDto stationFuelQuantityDto) {
        return fuelStationService.getRemainingFuelQuantity(stationFuelQuantityDto);
    }
}

