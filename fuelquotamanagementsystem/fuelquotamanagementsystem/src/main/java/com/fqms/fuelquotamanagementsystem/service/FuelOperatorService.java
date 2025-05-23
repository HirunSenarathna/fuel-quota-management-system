package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelOperatorDto;
import com.fqms.fuelquotamanagementsystem.Dtos.response.FuelOperatorResponseDto;

import java.util.List;

public interface FuelOperatorService {
    String registerFuelOperator(FuelOperatorDto fuelOperatorDto);

    List<FuelOperatorResponseDto> getAllFuelOperators(int stationId);
}
