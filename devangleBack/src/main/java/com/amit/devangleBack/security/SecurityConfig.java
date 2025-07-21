package com.amit.devangleBack.security;

import com.amit.devangleBack.security.oauth2.CustomOAuth2UserService;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.amit.devangleBack.security.oauth2.OAuth2SuccessHandler;

@Configuration
public class SecurityConfig {

    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    private final CustomOAuth2UserService customOAuth2UserService;

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService, CustomOAuth2UserService customOAuth2UserService, OAuth2SuccessHandler oAuth2SuccessHandler, OAuth2SuccessHandler OAuth2SuccessHandler) {
        this.userDetailsService = userDetailsService;
        this.customOAuth2UserService = customOAuth2UserService;
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/oauth2/**", "/api/posts/test", "/api/posts/**").permitAll()
                .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                .userService(customOAuth2UserService)
                )
                .successHandler(oAuth2SuccessHandler)
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
