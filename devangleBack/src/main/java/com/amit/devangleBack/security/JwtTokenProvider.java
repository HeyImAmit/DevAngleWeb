package com.amit.devangleBack.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;

    private final int jwtExpirationMs;

    public JwtTokenProvider(
            @Value("${app.jwtSecret:SecretKey12345SecretKey12345SecretKey12345SecretKey12345SecretKey12345}") String jwtSecret,
            @Value("${app.jwtExpirationMs:86400000}") int jwtExpirationMs) {
        // Must convert secret string to SecretKey instance:
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalArgumentException("JWT secret key must be at least 256 bits (32 bytes)");
        }
        this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        this.jwtExpirationMs = jwtExpirationMs;
    }

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS512) // new method
                .compact();
    }

    public String getEmailFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            System.out.println("JWT Token Provider - Validating token: " + authToken.substring(0, Math.min(50, authToken.length())) + "...");
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(authToken);
            System.out.println("JWT Token Provider - Token is valid");
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            System.out.println("JWT Token Provider - Token validation failed: " + ex.getMessage());
            ex.printStackTrace();
        }
        return false;
    }
}
