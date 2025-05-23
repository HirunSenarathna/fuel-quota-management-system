package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.FuelOperatorDto;
import com.fqms.fuelquotamanagementsystem.Dtos.response.FuelOperatorResponseDto;
import com.fqms.fuelquotamanagementsystem.models.system.FuelOperator;

import java.util.List;

public interface FuelOperatorService {
    String registerFuelOperator(FuelOperatorDto fuelOperatorDto);

    List<FuelOperatorResponseDto> getAllFuelOperators(int stationId);
}
