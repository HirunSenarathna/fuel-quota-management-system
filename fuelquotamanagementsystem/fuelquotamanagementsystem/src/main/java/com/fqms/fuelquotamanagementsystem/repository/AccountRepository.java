package com.fqms.fuelquotamanagementsystem.repository;

import com.fqms.fuelquotamanagementsystem.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByUsernameIgnoreCase(String username);

    List<Account> findByRole(String role);
}
