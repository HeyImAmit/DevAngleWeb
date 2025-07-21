package com.amit.devangleBack.service;

import java.util.Optional;

import com.amit.devangleBack.model.User;

public interface UserService {
    Optional<User> findByEmail(String email);
    User saveUser(User user);
}

