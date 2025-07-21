package com.amit.devangleBack.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.amit.devangleBack.dto.AuthResponse;
import com.amit.devangleBack.dto.LoginRequest;
import com.amit.devangleBack.dto.RegisterRequest;
import com.amit.devangleBack.model.User;
import com.amit.devangleBack.security.JwtTokenProvider;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setProvider("LOCAL");
        String avatarUrl = "https://api.dicebear.com/7.x/initials/svg?seed=" + request.getName();

        user.setAvatarUrl(avatarUrl);
        userService.saveUser(user);
        String token = jwtTokenProvider.generateToken(user.getEmail());

        return new AuthResponse(token, request.getEmail(), request.getName(), avatarUrl);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());
        String avatar = user.getAvatarUrl();
        if (avatar == null || avatar.isEmpty()) {
            avatar = "https://api.dicebear.com/7.x/initials/svg?seed=" + user.getName();
        }
        return new AuthResponse(token, user.getEmail(), user.getName(), avatar);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userService.findByEmail(email);
    }
}
