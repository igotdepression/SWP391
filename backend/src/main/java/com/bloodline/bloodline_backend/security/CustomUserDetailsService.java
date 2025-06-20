package com.bloodline.bloodline_backend.security;

import java.util.Collections;
//import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bloodline.bloodline_backend.entity.User;
import com.bloodline.bloodline_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        try {
            log.info("Attempting to find user with email: {}", email);
            
            if (email == null || email.trim().isEmpty()) {
                throw new IllegalArgumentException("Email cannot be empty");
            }
            
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> {
                        log.error("User not found for email: {}", email);
                        return new UsernameNotFoundException("User not found with email: " + email);
                    });
            
            log.info("Found user: {}", user.getEmail());
            
            if (user.getRole() == null) {
                log.error("User role is null for email: {}", email);
                throw new IllegalStateException("User role is not set");
            }
            
            String roleName = user.getRole().getRoleName();
            log.info("User role: {}", roleName);
            
            String authority = "ROLE_" + roleName;
            log.info("Granted authority: {}", authority);
            
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority(authority))
            );
        } catch (Exception e) {
            log.error("Error loading user by username: {}", e.getMessage(), e);
            throw e;
        }
    }
}