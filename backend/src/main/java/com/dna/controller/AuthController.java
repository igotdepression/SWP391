package com.dna.controller;

import com.dna.dto.LoginRequest;
import com.dna.dto.LoginResponse;
import com.dna.dto.RegisterRequest;
import com.dna.entity.Role;
import com.dna.entity.User;
import com.dna.repository.RoleRepository;
import com.dna.repository.UserRepository;
import com.dna.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(new LoginResponse(jwt, user.getEmail(), user.getFullName(), user.getRole().getRoleName(), user.getUserID()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            log.info("Attempting to register user with email: {}", registerRequest.getEmail());
            
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                log.warn("Registration failed: Email {} is already taken", registerRequest.getEmail());
                return ResponseEntity.badRequest().body("Email đã được sử dụng!");
            }

            // Create user
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setFullName(registerRequest.getFullName());
            user.setPhoneNumber(registerRequest.getPhoneNumber());
            user.setAddress(registerRequest.getAddress());
            user.setStatus("Active");

            // Set default role (CUSTOMER)
            Role userRole = roleRepository.findByRoleName("CUSTOMER")
                    .orElseThrow(() -> {
                        log.error("Registration failed: CUSTOMER role not found");
                        return new RuntimeException("Không tìm thấy vai trò CUSTOMER");
                    });
            user.setRole(userRole);

            userRepository.save(user);
            log.info("User registered successfully: {}", user.getEmail());

            return ResponseEntity.ok("Đăng ký thành công!");
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Đăng ký thất bại: " + e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {
        log.info("Test endpoint called");
        return ResponseEntity.ok("Backend connection successful!");
    }
}