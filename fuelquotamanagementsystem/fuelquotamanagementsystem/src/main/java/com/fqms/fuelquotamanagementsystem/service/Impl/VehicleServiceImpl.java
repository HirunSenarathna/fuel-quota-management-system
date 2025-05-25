package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.models.system.Account;
import com.fqms.fuelquotamanagementsystem.models.system.Vehicle;
import com.fqms.fuelquotamanagementsystem.repository.mock.RegisteredVehicleRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.AccountRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.VehicleRepository;
import com.fqms.fuelquotamanagementsystem.service.VehicleService;
import com.google.zxing.WriterException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fqms.fuelquotamanagementsystem.shared.ApplicationConstants;

import java.io.IOException;
import java.util.Optional;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private RegisteredVehicleRepository registeredVehicleRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    public boolean isRegisteredVehicle(String vehicleNumber, String chassisNumber) {
        return registeredVehicleRepository.findByVehicleNumberAndChassisNumber(vehicleNumber, chassisNumber).isPresent();
    }

    private boolean isVehicleExists(String username, String chassisNumber, String vehicleNumber) {
        return vehicleRepository.existsVehicleByAccount_UsernameAndChassisNumberAndVehicleNumber(username, chassisNumber, vehicleNumber);
    }

    @Override
    @Transactional
    public ResponseEntity<byte[]> registerVehicle(VehicleRegistrationRequestDto request) {

        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setRole( ApplicationConstants.ROLES.ROLE_VEHICLE.name());

        Optional<Account> accountExists = accountRepository.findByUsernameIgnoreCase(request.getUsername());

        if (accountExists.isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Account savedAccount = accountRepository.save(account);

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setChassisNumber(request.getChassisNumber());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setFuelType(request.getFuelType());
        vehicle.setPhone(request.getPhone());
        vehicle.setRemainingQuotaLimit(20.00);
        vehicle.setAccount(savedAccount);

        // Step 1: Check if it's a registered vehicle from the mock database
        if (!isRegisteredVehicle(vehicle.getVehicleNumber(), vehicle.getChassisNumber())) {
            // If not found in the mock database
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(null); // or you could return a custom error message as byte[] if preferred
        }

        if (!isVehicleExists(vehicle.getAccount().getUsername(), vehicle.getChassisNumber(), vehicle.getVehicleNumber())) {
            // Step 2: Save the vehicle in the system database
            Vehicle savedVehicle = vehicleRepository.save(vehicle);

            try {
                // Step 3: Prepare data for QR
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
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
}
