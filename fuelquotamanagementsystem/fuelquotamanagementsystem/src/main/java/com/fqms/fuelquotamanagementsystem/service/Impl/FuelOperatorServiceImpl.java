package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelOperatorDto;
import com.fqms.fuelquotamanagementsystem.models.system.Account;
import com.fqms.fuelquotamanagementsystem.models.system.FuelOperator;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStation;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStationOwner;
import com.fqms.fuelquotamanagementsystem.repository.system.AccountRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelOperatorRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelStationOwnerRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelStationRepository;
import com.fqms.fuelquotamanagementsystem.service.FuelOperatorService;
import com.fqms.fuelquotamanagementsystem.shared.ApplicationConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public final class FuelOperatorServiceImpl implements FuelOperatorService {

    private final AccountRepository accountRepository;
    private final FuelOperatorRepository fuelOperatorRepository;
    private final FuelStationRepository fuelStationRepository;
    private final PasswordEncoder passwordEncoder;
    private final FuelStationOwnerRepository fuelStationOwnerRepository;

    @Override
    public String registerFuelOperator(FuelOperatorDto fuelOperatorDto) {

        boolean exists = fuelOperatorRepository.existsFuelOperatorByNic(fuelOperatorDto.getNic());

        if (exists) {
            return "Fuel Operator Already Exists";
        } else {
            Account account = new Account();
            account.setUsername(fuelOperatorDto.getUsername());
            account.setPassword(passwordEncoder.encode(fuelOperatorDto.getPassword()));
            account.setRole(ApplicationConstants.ROLES.ROLE_FUEL_OPERATOR.name());

            Account savedAccount = accountRepository.save(account);

            FuelOperator fuelOperator = new FuelOperator();
            fuelOperator.setFullName(fuelOperatorDto.getFullName());
            fuelOperator.setNic(fuelOperatorDto.getNic());
            fuelOperator.setPhoneNumber(fuelOperatorDto.getContactNo());
            fuelOperator.setAccount(savedAccount);

            Optional<FuelStationOwner> fuelStationOwner = fuelStationOwnerRepository.findById(fuelOperatorDto.getStationOwnerId());

            FuelStation fuelStation = fuelStationRepository.findByStationOwner(fuelStationOwner);
            if (fuelStation != null) {
                fuelOperator.setStation(fuelStation);
            } else {
                // Optional: handle the case where the station is not found
                throw new IllegalArgumentException("Fuel Station not found for owner ID: " + fuelOperatorDto.getStationOwnerId());
            }

            fuelOperatorRepository.save(fuelOperator);

            return "Fuel Operator Registered Successfully!";
        }
    }
}
