package com.bloodline.bloodline_backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            // Lấy UserDetails từ Authentication để tạo token
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails);
            
            Account account = accountRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                    
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User details not found"));
            
            return new LoginResponse(
                    token,
                    account.getEmail(),
                    user.getFullName(),
                    user.getRole().getRoleName()
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email/password");
        } catch (AuthenticationException e) {
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        }
    }
}