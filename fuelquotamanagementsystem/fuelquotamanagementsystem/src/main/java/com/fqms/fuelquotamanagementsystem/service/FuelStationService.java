package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelStationRegistrationRequestDto;
import com.fqms.fuelquotamanagementsystem.Dtos.ReceivedFuelQuantityDto;
import com.fqms.fuelquotamanagementsystem.Dtos.RemainingFuelQuantityForStations;
import com.fqms.fuelquotamanagementsystem.Dtos.StationFuelQuantityDto;
import com.fqms.fuelquotamanagementsystem.responses.FuelStationResponseDto;

import java.util.List;

public interface FuelStationService {
    String registerFuelStation(FuelStationRegistrationRequestDto request);

    List<String> getCitiesOfStation();

    List<FuelStationResponseDto> getFuelStationService();

    String setReceivedFuelQuantity(ReceivedFuelQuantityDto receivedFuelQuantityDto);

    int getRemainingFuelQuantity(StationFuelQuantityDto stationFuelQuantityDto);

    List<RemainingFuelQuantityForStations> getAllStationFuelDetails();
}
