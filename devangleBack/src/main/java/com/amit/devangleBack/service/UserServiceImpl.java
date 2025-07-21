package com.amit.devangleBack.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.amit.devangleBack.dao.UserRepository;
import com.amit.devangleBack.model.User;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}

