package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.LoginUserDto;
import com.fqms.fuelquotamanagementsystem.models.system.Vehicle;
import com.fqms.fuelquotamanagementsystem.repository.system.VehicleRepository;
import com.fqms.fuelquotamanagementsystem.responses.FuelOperatorUserResponseDto;
import com.fqms.fuelquotamanagementsystem.responses.StationOwnerResponseDto;
import com.fqms.fuelquotamanagementsystem.models.system.Account;
import com.fqms.fuelquotamanagementsystem.models.system.FuelOperator;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStationOwner;
import com.fqms.fuelquotamanagementsystem.repository.system.AccountRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelOperatorRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelStationOwnerRepository;
import com.fqms.fuelquotamanagementsystem.responses.VehicleResponseDto;
import com.fqms.fuelquotamanagementsystem.service.AuthService;
import com.fqms.fuelquotamanagementsystem.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpli implements AuthService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private FuelStationOwnerRepository fuelStationOwnerRepository;
    @Autowired
    private FuelOperatorRepository fuelOperatorRepository;
    @Autowired
    private VehicleRepository vehicleRepository;

    public AuthServiceImpli(AccountRepository accountRepository, AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.accountRepository = accountRepository;
    }

    public Account authenticate(LoginUserDto input) {
        System.out.println(input.getUsername());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return accountRepository.findByUsernameIgnoreCase(input.getUsername())
                .orElseThrow();
    }

    @Override
    public Optional<?> getCurrentUser() {
        // Get the authentication object
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new NotFoundException("No authenticated user found."); // No authenticated user
        }

        // Get the username of the current user
        String username = authentication.getName();
        Account account = accountRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Check if the user is an StationOwnerResponseDto
        Optional<FuelStationOwner> stationOwner = fuelStationOwnerRepository.findByAccountId(account.getId());
        if (stationOwner.isPresent()) {
            FuelStationOwner stOwner = stationOwner.get();
            // Return the StationOwnerResponseDto
            return Optional.of(new StationOwnerResponseDto(
                    account.getId(),
                    account.getUsername(),
                    account.getPassword(),
                    account.getRole(),
                    stOwner.getOwnerId(),
                    stOwner.getNic(),
                    stOwner.getFullName(),
                    stOwner.getPhoneNumber()
            ));
        }

        // Check if the user is a FuelOperator
        Optional<FuelOperator> fuelOperator = fuelOperatorRepository.findByAccountId(account.getId());
        if (fuelOperator.isPresent()) {
            FuelOperator flOperator = fuelOperator.get();
            // Return the FuelOperator
            return Optional.of(new FuelOperatorUserResponseDto(
                    account.getId(),
                    account.getUsername(),
                    account.getPassword(),
                    account.getRole(),
                    flOperator.getOperatorId(),
                    flOperator.getFullName(),
                    flOperator.getNic(),
                    flOperator.getPhoneNumber()
            ));
        }

        Optional<Vehicle> vehicle = vehicleRepository.findByAccountId(account.getId());
        if (vehicle.isPresent()) {
            Vehicle vehicleObj = vehicle.get();
            // Return the FuelOperator
            return Optional.of(new VehicleResponseDto(
                    account.getId(),
                    account.getUsername(),
                    account.getPassword(),
                    account.getRole(),
                    vehicleObj.getVehicleId(),
                    vehicleObj.getVehicleNumber(),
                    vehicleObj.getChassisNumber(),
                    vehicleObj.getVehicleType(),
                    vehicleObj.getPhone(),
                    vehicleObj.getFuelType(),
                    vehicleObj.getRemainingQuotaLimit()
            ));
        }

        // If no match is found, return an empty Optional
        throw new NotFoundException("No matching user found for the current authentication. Please ensure your credentials are correct and try again.");
    }
}
