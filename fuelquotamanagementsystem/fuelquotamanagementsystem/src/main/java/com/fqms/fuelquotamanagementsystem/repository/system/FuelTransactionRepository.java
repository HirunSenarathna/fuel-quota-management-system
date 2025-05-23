package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.FuelTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuelTransactionRepository extends JpaRepository<FuelTransaction, Integer> {

    List<FuelTransaction> findByVehicleId(int vehicleId);
    List<FuelTransaction> findByVehicleNumber(String vehicleNumber);
}
