package com.fqms.fuelquotamanagementsystem.service.Impl;

import com.fqms.fuelquotamanagementsystem.Dtos.*;
import com.fqms.fuelquotamanagementsystem.models.system.Account;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStation;
import com.fqms.fuelquotamanagementsystem.models.system.FuelStationOwner;
import com.fqms.fuelquotamanagementsystem.models.system.StationFuelQuantity;
import com.fqms.fuelquotamanagementsystem.repository.mock.RegisteredStationRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.AccountRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelStationOwnerRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.FuelStationRepository;
import com.fqms.fuelquotamanagementsystem.repository.system.StationFuelQuantityRepository;
import com.fqms.fuelquotamanagementsystem.responses.FuelStationResponseDto;
import com.fqms.fuelquotamanagementsystem.service.FuelStationService;
import com.fqms.fuelquotamanagementsystem.shared.ApplicationConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private StationFuelQuantityRepository stationFuelQuantityRepository;

    public boolean isRegisteredVehicle(String licenseNumber, String city) {
        return registeredStationRepository.findByLicenseNumberAndCity(licenseNumber, city).isPresent();
    }

    @Override
    public String registerFuelStation(FuelStationRegistrationRequestDto request) {
        boolean exists = stationRepository.existsFuelStationByLicenseNumberAndCity(request.getLicenseNumber(), request.getCity());

        if(exists) {
            return "The station already exists";
        } else {
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

    @Override
    public List<String> getCitiesOfStation() {
        return registeredStationRepository.getAllCities();
    }

    @Override
    public List<FuelStationResponseDto> getFuelStationService() {
        List<FuelStation> stations = stationRepository.findAll();

        return stations.stream().map(station -> new FuelStationResponseDto(
                station.getStationId(),
                station.getLicenseNumber(),
                station.getCity(),
                station.getStationOwner().getFullName(),  // Assuming FuelStation has a reference to FuelStationOwner
                station.getStationOwner().getPhoneNumber()
        )).collect(Collectors.toList());
    }

    @Override
    public String setReceivedFuelQuantity(ReceivedFuelQuantityDto receivedFuelQuantityDto) {
        try {
            // Validate input
            if (receivedFuelQuantityDto.getStationId() <= 0 ||
                    receivedFuelQuantityDto.getFuelType() == null ||
                    receivedFuelQuantityDto.getFuelType().isEmpty() ||
                    receivedFuelQuantityDto.getFuelQuantity() <= 0) {
                return "Invalid input: Please check station ID, fuel type, and fuel quantity.";
            }

            System.out.println("Received data: " +
                    receivedFuelQuantityDto.getStationId() + " " +
                    receivedFuelQuantityDto.getFuelType() + " " +
                    receivedFuelQuantityDto.getFuelQuantity());

            StationFuelQuantity stationFuelQuantity = stationFuelQuantityRepository
                    .findByStationIdAndFuelType(receivedFuelQuantityDto.getStationId(), receivedFuelQuantityDto.getFuelType());

            if (stationFuelQuantity != null) {
                stationFuelQuantity.setFuelQuantity(receivedFuelQuantityDto.getFuelQuantity());
                stationFuelQuantityRepository.save(stationFuelQuantity);
                return "Fuel quantity updated successfully.";
            } else {
                StationFuelQuantity newEntry = new StationFuelQuantity();
                newEntry.setStationId(receivedFuelQuantityDto.getStationId());
                newEntry.setFuelType(receivedFuelQuantityDto.getFuelType());
                newEntry.setFuelQuantity(receivedFuelQuantityDto.getFuelQuantity());
                stationFuelQuantityRepository.save(newEntry);
                return "Fuel quantity added successfully for new station-fuel combination.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred while saving fuel quantity: " + e.getMessage();
        }
    }

    @Override
    public int getRemainingFuelQuantity(StationFuelQuantityDto stationFuelQuantityDto) {
        StationFuelQuantity stationFuelQuantity = stationFuelQuantityRepository
                .findByStationIdAndFuelType(
                        stationFuelQuantityDto.getStationId(),
                        stationFuelQuantityDto.getFuelType());

        if (stationFuelQuantity != null) {
            return stationFuelQuantity.getFuelQuantity();
        } else {
            throw new IllegalArgumentException("No fuel record found for Station ID " +
                    stationFuelQuantityDto.getStationId() + " and Fuel Type '" +
                    stationFuelQuantityDto.getFuelType() + "'");
        }
    }

    @Override
    public List<RemainingFuelQuantityForStations> getAllStationFuelDetails() {
        return stationRepository.getRemainingFuelDetailsForAllStations();
    }
}

