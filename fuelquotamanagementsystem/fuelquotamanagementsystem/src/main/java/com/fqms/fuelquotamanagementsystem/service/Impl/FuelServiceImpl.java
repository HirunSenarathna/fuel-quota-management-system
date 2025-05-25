package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelPumpRequestDto;
import com.fqms.fuelquotamanagementsystem.models.system.FuelTransaction;
import com.fqms.fuelquotamanagementsystem.models.system.StationFuelQuantity;
import com.fqms.fuelquotamanagementsystem.models.system.Vehicle;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelTransactionRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.StationFuelQuantityRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.VehicleRepository;
import com.fqms.fuelquotamanagementsystem.responses.FuelOperatorUserResponseDto;
import com.fqms.fuelquotamanagementsystem.service.AuthService;
import com.fqms.fuelquotamanagementsystem.service.FuelService;
import com.fqms.fuelquotamanagementsystem.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
public class FuelServiceImpl implements FuelService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private FuelTransactionRepository fuelTransactionRepository;

    @Autowired
    private StationFuelQuantityRepository stationFuelQuantityRepository;

    @Autowired
    private SmsService smsService;

    @Autowired
    private AuthService authService;

    @Override
    public ResponseEntity<String> processFuelPump(FuelPumpRequestDto request) {

        log.info("Fuel Pump Request: {}", request.toString());
        log.info(String.valueOf(request.getOperatorId()));
        log.info(String.valueOf(request.getStationId()));

        try {
            // Validate operatorId and stationId
            if (request.getOperatorId() <= 0 || request.getStationId() <= 0) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Invalid operatorId or stationId");
            }

            // Validate fuel type
            if (request.getFuelType() == null || request.getFuelType().trim().isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Fuel type is required");
            }

            // Check station fuel availability
            StationFuelQuantity stationFuel = stationFuelQuantityRepository
                    .findByStationIdAndFuelTypeIgnoreCase(request.getStationId(), request.getFuelType());

            if (stationFuel == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Fuel type '" + request.getFuelType() + "' is not available at this station");
            }

            // Check if station has sufficient fuel quantity
            if (stationFuel.getFuelQuantity() < request.getPumpedAmount()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Insufficient fuel at station. Available: " + stationFuel.getFuelQuantity() + "L, Requested: " + request.getPumpedAmount() + "L");
            }

            // Find vehicle by vehicle number and chassis number
            Optional<Vehicle> vehicleOpt = vehicleRepository
                    .findByVehicleNumberAndChassisNumber(request.getVehicleNumber(), request.getChassisNumber());

            if (vehicleOpt.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Vehicle not found");
            }

            Vehicle vehicle = vehicleOpt.get();

            // Check if sufficient quota is available
            if (vehicle.getRemainingQuotaLimit() < request.getPumpedAmount()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Insufficient quota. Available: " + vehicle.getRemainingQuotaLimit() + "L");
            }

            // Update vehicle quota
            double newQuota = vehicle.getRemainingQuotaLimit() - request.getPumpedAmount();
            vehicle.setRemainingQuotaLimit(newQuota);
            vehicleRepository.save(vehicle);

            // Reduce station fuel quantity
            int newStationFuelQuantity = stationFuel.getFuelQuantity() - (int) request.getPumpedAmount();
            stationFuel.setFuelQuantity(newStationFuelQuantity);
            stationFuelQuantityRepository.save(stationFuel);

            // Create fuel transaction record
            FuelTransaction transaction = new FuelTransaction();
            transaction.setVehicleId(vehicle.getVehicleId());
            transaction.setVehicleNumber(vehicle.getVehicleNumber());
            transaction.setPumpedAmount(request.getPumpedAmount());
            transaction.setRemainingQuota(newQuota);
            transaction.setOperatorId(request.getOperatorId());
            transaction.setStationId(request.getStationId());
            transaction.setTransactionDate(LocalDateTime.now());
            transaction.setFuelType(request.getFuelType());
            fuelTransactionRepository.save(transaction);

            // Send SMS notification
            String message = String.format(
                    "Fuel Alert: %.2fL fuel pumped for vehicle %s. Remaining quota: %.2fL. Date: %s",
                    request.getPumpedAmount(),
                    vehicle.getVehicleNumber(),
                    newQuota,
                    LocalDateTime.now().toString()
            );

            String phoneNumber = vehicle.getPhone();

            if (phoneNumber != null && !phoneNumber.trim().isEmpty()) {
                boolean smsSent = smsService.sendSms(phoneNumber, message);
                if (smsSent) {
                    return ResponseEntity.ok("Fuel pumped successfully. SMS notification sent.");
                } else {
                    return ResponseEntity.ok("Fuel pumped successfully. SMS notification failed.");
                }
            } else {
                return ResponseEntity.ok("Fuel pumped successfully. No phone number available for SMS notification.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing fuel pump: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getVehicleQuota(String vehicleNumber) {
        try {
            Optional<Vehicle> vehicleOpt = vehicleRepository.findByVehicleNumber(vehicleNumber);

            if (vehicleOpt.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Vehicle not found");
            }

            Vehicle vehicle = vehicleOpt.get();
            return ResponseEntity.ok(vehicle);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving vehicle quota: " + e.getMessage());
        }
    }
}
