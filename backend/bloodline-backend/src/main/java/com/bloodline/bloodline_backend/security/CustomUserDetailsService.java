package com.bloodline.bloodline_backend.security;

import java.util.Collections;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bloodline.bloodline_backend.entity.Account;
import com.bloodline.bloodline_backend.entity.User;
import com.bloodline.bloodline_backend.repository.AccountRepository;
import com.bloodline.bloodline_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        try {
            System.out.println("Attempting to find user with email: " + email);
            
            // Thử truy vấn tất cả tài khoản để xem database có kết nối không
            List<Account> allAccounts = accountRepository.findAll();
            System.out.println("Total accounts in database: " + allAccounts.size());
            allAccounts.forEach(acc -> System.out.println("Account: " + acc.getEmail()));
            
            Account account = accountRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            
            System.out.println("Found account: " + account.getEmail());
            System.out.println("Password (hashed): " + account.getPassword());
            
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User details not found"));
            
            return new org.springframework.security.core.userdetails.User(
                    account.getEmail(),
                    account.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName()))
            );
        } catch (Exception e) {
            System.out.println("Error in loadUserByUsername: " + e.getMessage());
            throw e;
        }
    }
}