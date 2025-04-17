package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.models.Account;
import com.fqms.fuelquotamanagementsystem.models.FuelStation;
import com.fqms.fuelquotamanagementsystem.models.FuelStationOwner;
import com.fqms.fuelquotamanagementsystem.repository.AccountRepository;
import com.fqms.fuelquotamanagementsystem.repository.FuelStationOwnerRepository;
import com.fqms.fuelquotamanagementsystem.repository.FuelStationRepository;
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

    @Override
    public void registerFuelStation(FuelStationRegistrationRequestDto request) {

        // Create account
        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setEmail(request.getEmail());
        account.setRole( ApplicationConstants.ROLES.ROLE_FUEL_STATION_OWNER.name());
        Account savedAccount = accountRepository.save(account);

        // Create fuel station owner
        FuelStationOwner owner = new FuelStationOwner();
        owner.setFullName(request.getFullName());
        owner.setNic(request.getNic());
        owner.setPhoneNumber(request.getPhoneNumber());
        owner.setAddress(request.getAddress());
        owner.setAccount(savedAccount);
        FuelStationOwner savedOwner = ownerRepository.save(owner);

        // Create fuel station
        FuelStation station = new FuelStation();
        station.setStationName(request.getStationName());
        station.setLocation(request.getLocation());
        station.setFuelTypesAvailable(request.getFuelTypesAvailable());
        station.setLicenseNumber(request.getLicenseNumber());
        station.setStationOwner(savedOwner);
        stationRepository.save(station);
    }
}

