package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.FuelOperator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelOperatorRepository extends JpaRepository<FuelOperator, Integer> {

    boolean existsFuelOperatorByNic(String nic);
}
