package com.fqms.fuelquotamanagementsystem.repository.system;

import com.fqms.fuelquotamanagementsystem.models.system.FuelOperator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FuelOperatorRepository extends JpaRepository<FuelOperator, Integer> {

    boolean existsFuelOperatorByNic(String nic);

    @Query("SELECT fo FROM FuelOperator fo WHERE fo.station.stationId = :stationId")
    List<FuelOperator> findAllByStationId(@Param("stationId") int stationId);
}
