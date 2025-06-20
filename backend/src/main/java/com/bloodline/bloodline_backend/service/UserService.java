package com.bloodline.bloodline_backend.service;

import com.bloodline.bloodline_backend.dto.UserDTO;
import com.bloodline.bloodline_backend.entity.User;
import com.bloodline.bloodline_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }
    
    public UserDTO getUserById(Integer id) {
        return userRepository.findById(id)
                .map(this::mapToUserDto)
                .orElse(null);
    }
    
    public UserDTO getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::mapToUserDto)
                .orElse(null);
    }
    
    public UserDTO updateUser(String email, UserDTO userDTO) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        existingUser.setFullName(userDTO.getFullName());
        existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        existingUser.setAddress(userDTO.getAddress());
        existingUser.setDateOfBirth(userDTO.getDateOfBirth());
        existingUser.setGender(userDTO.getGender());

        User updatedUser = userRepository.save(existingUser);
        return mapToUserDto(updatedUser);
    }
    
    private UserDTO mapToUserDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getUserID());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole().getRoleName());
        dto.setStatus(user.getStatus());
        dto.setAddress(user.getAddress());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setGender(user.getGender());
        return dto;
    }
}