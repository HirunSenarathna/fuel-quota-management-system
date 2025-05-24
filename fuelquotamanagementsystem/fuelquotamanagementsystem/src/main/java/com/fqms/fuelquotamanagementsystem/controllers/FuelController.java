package com.fqms.fuelquotamanagementsystem.controllers;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelPumpRequestDto;
import com.fqms.fuelquotamanagementsystem.service.FuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fuel")
@CrossOrigin(origins = "*")
public class FuelController {

    @Autowired
    private FuelService fuelService;

    @PostMapping("/pump")
    public ResponseEntity<String> processFuelPump(@RequestBody FuelPumpRequestDto request) {
        return fuelService.processFuelPump(request);
    }

    @GetMapping("/quota/{vehicleNumber}")
    public ResponseEntity<?> getVehicleQuota(@PathVariable String vehicleNumber) {
        return fuelService.getVehicleQuota(vehicleNumber);
    }
}
