package com.bloodline.bloodline_backend.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import com.bloodline.bloodline_backend.repository.AccountRepository;
import com.bloodline.bloodline_backend.repository.RoleRepository;
import com.bloodline.bloodline_backend.repository.UserRepository;
import com.bloodline.bloodline_backend.entity.Account;
import com.bloodline.bloodline_backend.entity.Role;
import com.bloodline.bloodline_backend.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String MANAGER_EMAIL = "02131@fpt.edu.vn";
    private static final String MANAGER_PASSWORD = "your_manager_password";
    private static final String MANAGER_ROLE_NAME = "MANAGER";

    @BeforeEach
    void setup() {
        // Ensure the MANAGER role exists
        Role managerRole = roleRepository.findByRoleName(MANAGER_ROLE_NAME)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setRoleName(MANAGER_ROLE_NAME);
                    return roleRepository.save(newRole);
                });

        // Create an account for the manager user
        Account managerAccount = new Account();
        managerAccount.setEmail(MANAGER_EMAIL);
        managerAccount.setPassword(passwordEncoder.encode(MANAGER_PASSWORD));
        accountRepository.save(managerAccount);

        // Create the manager user
        User managerUser = new User();
        managerUser.setFullName("Manager Test");
        managerUser.setEmail(MANAGER_EMAIL);
        managerUser.setRole(managerRole);
        managerUser.setStatus("ACTIVE");
        userRepository.save(managerUser);
    }

    @AfterEach
    void tearDown() {
        // Clean up: Delete user, then account, then role (if it was created in this test)
        userRepository.findByEmail(MANAGER_EMAIL).ifPresent(userRepository::delete);
        accountRepository.findByEmail(MANAGER_EMAIL).ifPresent(accountRepository::delete);
        // Only delete the role if it was created specifically for this test or if it's safe to do so.
        // For now, we assume roles are seeded and not deleted by tests.
    }

    @Test
    public void testLoginForManagerUser() throws Exception {
        String loginRequestBody = String.format(
                "{\"email\": \"%s\", \"password\": \"%s\"}",
                MANAGER_EMAIL, MANAGER_PASSWORD
        );

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk()); // Expecting 200 OK for permitAll()
    }
} 