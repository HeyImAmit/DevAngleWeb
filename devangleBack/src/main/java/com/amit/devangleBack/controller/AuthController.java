package com.amit.devangleBack.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amit.devangleBack.dto.AuthResponse;
import com.amit.devangleBack.dto.LoginRequest;
import com.amit.devangleBack.dto.RegisterRequest;
import com.amit.devangleBack.model.User;
import com.amit.devangleBack.security.JwtTokenProvider;
import com.amit.devangleBack.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;
    JwtTokenProvider jwtTokenProvider;

    public AuthController(AuthService authService, JwtTokenProvider jwtTokenProvider) {
        this.authService = authService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public AuthResponse getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtTokenProvider.getEmailFromJWT(token);
        User user = authService.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return new AuthResponse(token, email, user.getName(), user.getAvatarUrl());
    }

}
