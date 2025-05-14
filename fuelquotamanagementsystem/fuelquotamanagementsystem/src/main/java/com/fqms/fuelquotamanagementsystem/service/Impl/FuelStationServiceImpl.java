package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.models.system.Account;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStation;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStationOwner;
import com.fqms.fuelquotamanagementsystem.repository.mock.RegisteredStationRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.AccountRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelStationOwnerRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelStationRepository;
import com.fqms.fuelquotamanagementsystem.service.FuelStationService;
import com.fqms.fuelquotamanagementsystem.shared.ApplicationConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class FuelStationServiceImpl implements FuelStationService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private FuelStationOwnerRepository ownerRepository;

    @Autowired
    private FuelStationRepository stationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RegisteredStationRepository registeredStationRepository;

    public boolean isRegisteredVehicle(String licenseNumber, String city) {
        return registeredStationRepository.findByLicenseNumberAndCity(licenseNumber, city).isPresent();
    }

    @Override
    public String registerFuelStation(FuelStationRegistrationRequestDto request) {

        if (!isRegisteredVehicle(request.getLicenseNumber(), request.getCity())) {
            return "This station is not registered.";
        } else {
            // Create account
            Account account = new Account();
            account.setUsername(request.getUsername());
            account.setPassword(passwordEncoder.encode(request.getPassword()));
            account.setRole( ApplicationConstants.ROLES.ROLE_FUEL_STATION_OWNER.name());
            Account savedAccount = accountRepository.save(account);

            // Create fuel station owner
            FuelStationOwner owner = new FuelStationOwner();
            owner.setFullName(request.getFullName());
            owner.setNic(request.getNic());
            owner.setPhoneNumber(request.getPhoneNumber());
            owner.setAccount(savedAccount);
            FuelStationOwner savedOwner = ownerRepository.save(owner);

            // Create fuel station
            FuelStation station = new FuelStation();
            station.setAddressLine1(request.getAddressLine1());
            station.setAddressLine2(request.getAddressLine2());
            station.setCity(request.getCity());
            station.setLicenseNumber(request.getLicenseNumber());
            station.setStationOwner(savedOwner);
            stationRepository.save(station);

            return "Fuel Station Registered Successfully!";
        }
    }
}

