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

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
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
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account = accountRepository.save(account);

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setAccount(account);
        user.setRole(customerRole);
        user.setStatus("ACTIVE");
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Register success"));
    }
}