package com.bloodline.bloodline_backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bloodline.bloodline_backend.dto.LoginRequest;
import com.bloodline.bloodline_backend.dto.LoginResponse;
import com.bloodline.bloodline_backend.entity.Account;
import com.bloodline.bloodline_backend.entity.User;
import com.bloodline.bloodline_backend.repository.AccountRepository;
import com.bloodline.bloodline_backend.repository.UserRepository;
import com.bloodline.bloodline_backend.security.JwtUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            log.info("Attempting to authenticate user: {}", loginRequest.getEmail());
            
            // Validate input
            if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("Password is required");
            }
            
            // Check if account exists before authentication
            Account account = accountRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + loginRequest.getEmail()));
            log.info("Account found: {}", account.getEmail());
            
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            
            log.info("Authentication successful for user: {}", loginRequest.getEmail());

            // Get UserDetails and generate token
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails);
            log.info("JWT token generated successfully");
            
            // Get user details
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User details not found"));
            log.info("User details found: {}", user.getFullName());
            
            // Check if user is active
            if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
                throw new RuntimeException("User account is not active");
            }
            
            return new LoginResponse(
                    token,
                    account.getEmail(),
                    user.getFullName(),
                    user.getRole().getRoleName()
            );
        } catch (BadCredentialsException e) {
            log.error("Invalid credentials for user: {}", loginRequest.getEmail());
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        } catch (UsernameNotFoundException e) {
            log.error("User not found: {}", e.getMessage());
            throw new UsernameNotFoundException("User not found: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("Invalid input: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Authentication failed for user: {} - Error: {}", loginRequest.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        }
    }
}