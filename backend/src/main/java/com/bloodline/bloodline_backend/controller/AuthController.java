package com.bloodline.bloodline_backend.controller;

import com.bloodline.bloodline_backend.dto.LoginRequest;
import com.bloodline.bloodline_backend.dto.LoginResponse;
import com.bloodline.bloodline_backend.dto.RegisterRequest;
import com.bloodline.bloodline_backend.entity.User;
import com.bloodline.bloodline_backend.entity.Role;
import com.bloodline.bloodline_backend.entity.Account;
import com.bloodline.bloodline_backend.repository.UserRepository;
import com.bloodline.bloodline_backend.repository.RoleRepository;
import com.bloodline.bloodline_backend.repository.AccountRepository;
import com.bloodline.bloodline_backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.http.HttpStatus;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            log.info("Received login request for email: {}", loginRequest.getEmail());
            
            if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
                log.error("Login failed - Email is empty");
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
            }
            
            if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
                log.error("Login failed - Password is empty");
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Password is required"));
            }
            
            LoginResponse response = authService.login(loginRequest);
            log.info("Login successful for user: {}", loginRequest.getEmail());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            log.error("Login failed - Invalid credentials for user: {}", loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid email or password"));
        } catch (Exception e) {
            log.error("Login failed - Unexpected error for user: {} - Error: {}", 
                loginRequest.getEmail(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "An unexpected error occurred"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        Role customerRole = roleRepository.findByRoleName("CUSTOMER");
        if (customerRole == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Role CUSTOMER not found"));
        }
        Account account = new Account();
        account.setEmail(request.getEmail());
        account.setPassword(passwordEncoder.encode(request.getPassword())); // Mã hóa mật khẩu trước khi lưu
        account = accountRepository.save(account);

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setAccount(account);
        user.setRole(customerRole);
        user.setStatus("ACTIVE");
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Register success"));
    }
}