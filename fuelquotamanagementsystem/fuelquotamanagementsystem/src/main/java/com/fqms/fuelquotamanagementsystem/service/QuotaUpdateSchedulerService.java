package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.models.mock.RegisteredVehicle;
import com.fqms.fuelquotamanagementsystem.models.system.Vehicle;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import com.fqms.fuelquotamanagementsystem.repository.mock.RegisteredVehicleRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.VehicleRepository;
import org.slf4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QuotaUpdateSchedulerService {
    private static final Logger logger = LoggerFactory.getLogger(QuotaUpdateSchedulerService.class);

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private RegisteredVehicleRepository registeredVehicleRepository;


    @Scheduled(cron = "0 0 0 * * SUN") // Every Sunday at midnight
//    @Scheduled(fixedRate = 60000)
    @Transactional
    public void updateQuotaLimitsWeekly() {
        logger.info("Starting weekly quota limit update process...");
        log.info("Starting weekly quota limit update process...");

        try {
            List<Vehicle> allVehicles = vehicleRepository.findAll();
            int updatedCount = 0;
            int failedCount = 0;

            for (Vehicle vehicle : allVehicles) {
                try {
                    boolean updated = updateVehicleQuotaLimit(vehicle);
                    if (updated) {
                        updatedCount++;
                    }
                } catch (Exception e) {
                    logger.error("Failed to update quota for vehicle: {} - {}",
                            vehicle.getVehicleNumber(), e.getMessage());
                    failedCount++;
                }
            }

            logger.info("Updated quota limit for vehicles: {}", updatedCount);
            logger.info("Weekly quota update completed. Updated: {}, Failed: {}, Total: {}",
                    updatedCount, failedCount, allVehicles.size());

        } catch (Exception e) {
            logger.error("Error during weekly quota update process: {}", e.getMessage(), e);
        }
    }


    @Transactional
    public boolean updateVehicleQuotaLimit(Vehicle vehicle) {
        try {
            // Find the corresponding registered vehicle
            Optional<Object> registeredVehicleOpt = registeredVehicleRepository
                    .findByVehicleNumberAndChassisNumber(vehicle.getVehicleNumber(), vehicle.getChassisNumber());

            if (registeredVehicleOpt.isPresent()) {
                RegisteredVehicle registeredVehicle = (RegisteredVehicle) registeredVehicleOpt.get();

                // Update the quota limit from registered vehicle
                Double newQuotaLimit = registeredVehicle.getRemainingQuotaLimit();
                Double oldQuotaLimit = vehicle.getRemainingQuotaLimit();

                vehicle.setRemainingQuotaLimit(newQuotaLimit);
                vehicleRepository.save(vehicle);

                logger.debug("Updated quota for vehicle {}: {} -> {}",
                        vehicle.getVehicleNumber(), oldQuotaLimit, newQuotaLimit);
                return true;
            } else {
                logger.warn("No registered vehicle found for vehicle number: {} and chassis: {}",
                        vehicle.getVehicleNumber(), vehicle.getChassisNumber());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error updating quota for vehicle {}: {}",
                    vehicle.getVehicleNumber(), e.getMessage());
            throw e;
        }
    }
}
