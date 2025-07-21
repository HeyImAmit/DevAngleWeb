package com.amit.devangleBack.service;

import java.util.Optional;

import com.amit.devangleBack.dto.AuthResponse;
import com.amit.devangleBack.dto.LoginRequest;
import com.amit.devangleBack.dto.RegisterRequest;
import com.amit.devangleBack.model.User;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    Optional<User> findByEmail(String email);
}

