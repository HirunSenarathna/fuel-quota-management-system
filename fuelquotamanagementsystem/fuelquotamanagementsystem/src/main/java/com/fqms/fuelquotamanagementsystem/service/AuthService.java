package com.fqms.fuelquotamanagementsystem.service;

import com.fqms.fuelquotamanagementsystem.Dtos.LoginUserDto;
import com.fqms.fuelquotamanagementsystem.models.system.Account;

import java.util.Optional;

public interface AuthService {
    Account authenticate(LoginUserDto input);

    Optional<?> getCurrentUser();
}
