package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.models.Vehicle;
import com.fqms.fuelquotamanagementsystem.repository.VehicleRepository;
import com.fqms.fuelquotamanagementsystem.service.VehicleService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public ResponseEntity<byte[]> registerVehicle(VehicleRegistrationRequestDto request) {

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setChassisNumber(request.getChassisNumber());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setFuelType(request.getFuelType());
        vehicle.setRemainingQuotaLimit(20.00);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        if (savedVehicle != null) {
            try {
                // Prepare QR data as a simple JSON-like string
                String data = String.format(
                        "Vehicle Number: %s\nChassis Number: %s\nVehicle Type: %s\nFuel Type: %s\nRemaining Quota Limit: %.2f",
                        savedVehicle.getVehicleNumber(),
                        savedVehicle.getChassisNumber(),
                        savedVehicle.getVehicleType(),
                        savedVehicle.getFuelType(),
                        savedVehicle.getRemainingQuotaLimit()
                );

                byte[] qrImage = QRCodeGenerator.generateQRCode(data, 300, 300);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_PNG);
                headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=vehicle-qr.png");

                return ResponseEntity.ok().headers(headers).body(qrImage);

            } catch (WriterException | IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(null);
            }
        } else {
            return ResponseEntity.status(400).body(null); // Registration failed
        }
    }
}
