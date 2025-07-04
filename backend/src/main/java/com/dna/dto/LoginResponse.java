package com.dna.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String email;
    private String fullName;
    private String role;
    private Integer userId;
    
    // Constructors
    public LoginResponse() {
    }
    
    public LoginResponse(String token) {
        this.token = token;
    }

    public LoginResponse(String token, String email, String fullName, String role, Integer userId) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.userId = userId;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public Integer getUserId() {
        return userId;
    }
    
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}