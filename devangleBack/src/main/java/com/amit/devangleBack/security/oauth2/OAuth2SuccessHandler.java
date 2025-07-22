package com.amit.devangleBack.security.oauth2;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.amit.devangleBack.dao.UserRepository;
import com.amit.devangleBack.model.User;
import com.amit.devangleBack.security.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${frontend.url}")
    private String frontendURL;

    public OAuth2SuccessHandler(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String avatarUrl = oAuth2User.getAttribute("picture");

        Optional<User> userOpt = userRepository.findByEmail(email);
        User user;

        if (userOpt.isEmpty()) {
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setAvatarUrl(avatarUrl);
            user.setProvider("GOOGLE"); // or GITHUB, auto-detect later if needed
            user.setPassword(""); // No password needed for social login
            userRepository.save(user);
        } else {
            user = userOpt.get();
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());

        // Redirect to your frontend, passing token as query param
        String frontendUrl = frontendURL + "/auth/callback?token=" + token;
        response.sendRedirect(frontendUrl);
    }
}
