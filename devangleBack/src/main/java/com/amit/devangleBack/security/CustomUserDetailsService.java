package com.amit.devangleBack.security; 

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.amit.devangleBack.dao.UserRepository;
import com.amit.devangleBack.model.User;
 
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("CustomUserDetailsService - Loading user by email: " + email);
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> {
                System.out.println("CustomUserDetailsService - User not found with email: " + email);
                return new UsernameNotFoundException("User not found with email: " + email);
            });

        System.out.println("CustomUserDetailsService - User found: " + user.getName());
        
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())  // role like "USER"
                .build();
    }
}
