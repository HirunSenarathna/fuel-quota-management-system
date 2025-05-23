package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelPumpRequestDto;
import com.fqms.fuelquotamanagementsystem.models.system.FuelTransaction;
import com.fqms.fuelquotamanagementsystem.models.system.Vehicle;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelTransactionRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.VehicleRepository;
import com.fqms.fuelquotamanagementsystem.service.FuelService;
import com.fqms.fuelquotamanagementsystem.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FuelServiceImpl implements FuelService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private FuelTransactionRepository fuelTransactionRepository;

    @Autowired
    private SmsService smsService;

    @Override
    public ResponseEntity<String> processFuelPump(FuelPumpRequestDto request) {
        try {
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

            // Create fuel transaction record
            FuelTransaction transaction = new FuelTransaction();
            transaction.setVehicleId(vehicle.getVehicleId());
            transaction.setVehicleNumber(vehicle.getVehicleNumber());
            transaction.setPumpedAmount(request.getPumpedAmount());
            transaction.setRemainingQuota(newQuota);
            transaction.setTransactionDate(LocalDateTime.now());
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

            // Check if phone number exists before sending SMS
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
