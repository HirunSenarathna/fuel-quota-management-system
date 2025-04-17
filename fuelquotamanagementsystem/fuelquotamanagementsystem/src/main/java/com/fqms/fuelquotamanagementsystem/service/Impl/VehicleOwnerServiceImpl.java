package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.VehicleOwnerRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.models.Account;
import com.fqms.fuelquotamanagementsystem.models.VehicleOwner;
import com.fqms.fuelquotamanagementsystem.repository.AccountRepository;
import com.fqms.fuelquotamanagementsystem.repository.VehicleOwnerRepository;
import com.fqms.fuelquotamanagementsystem.service.VehicleOwnerService;
import com.fqms.fuelquotamanagementsystem.shared.ApplicationConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class VehicleOwnerServiceImpl implements VehicleOwnerService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void registerVehicleOwner(VehicleOwnerRegistrationRequestDto request) {

        // Create Account
        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setEmail(request.getEmail());
        account.setRole( ApplicationConstants.ROLES.ROLE_VEHICLE_OWNER.name());
        Account savedAccount = accountRepository.save(account);

        // Create Vehicle Owner
        VehicleOwner owner = new VehicleOwner();
        owner.setFullName(request.getFullName());
        owner.setNic(request.getNic());
        owner.setPhoneNumber(request.getPhoneNumber());
        owner.setAddress(request.getAddress());
        owner.setAccount(savedAccount);
        VehicleOwner savedOwner = vehicleOwnerRepository.save(owner);
    }
}

