package com.dna.service;

import com.dna.dto.UserDTO;
import com.dna.entity.User;
import com.dna.repository.UserRepository;
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
    
    // Chỉ cho phép tạo user với role STAFF hoặc MANAGER
    public UserDTO createStaffOrManager(UserDTO userDTO) {
        if (userDTO.getRole() == null ||
            !(userDTO.getRole().equalsIgnoreCase("STAFF") || userDTO.getRole().equalsIgnoreCase("MANAGER"))) {
            return null;
        }
        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        user.setStatus(userDTO.getStatus());
       
        User savedUser = userRepository.save(user);
        return mapToUserDto(savedUser);
    }

    // Chỉ cho phép update hồ sơ cho STAFF hoặc MANAGER, không cho phép update customer
    public UserDTO updateStaffOrManager(Integer id, UserDTO userDTO) {
        return userRepository.findById(id).map(user -> {
            if (user.getRole() == null ||
                !(user.getRole().getRoleName().equalsIgnoreCase("STAFF") || user.getRole().getRoleName().equalsIgnoreCase("MANAGER"))) {
                return null;
            }
            user.setFullName(userDTO.getFullName());
            user.setEmail(userDTO.getEmail());
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setAddress(userDTO.getAddress());
            user.setStatus(userDTO.getStatus());
            User savedUser = userRepository.save(user);
            return mapToUserDto(savedUser);
        }).orElse(null);
    }

    // Không xóa vật lý user, chỉ cập nhật status
    public UserDTO deactivateUser(Integer id) {
        return userRepository.findById(id).map(user -> {
            user.setStatus("INACTIVE");
            User savedUser = userRepository.save(user);
            return mapToUserDto(savedUser);
        }).orElse(null);
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
        dto.setGender(user.getGender());
        dto.setDateOfBirth(user.getDateOfBirth());
        return dto;
    }

    public UserDTO updateToCustomer(Integer id, UserDTO userDTO){
        return userRepository.findById(id).map(user -> {
            if (user.getRole() == null ||
                !(user.getRole().getRoleName().equalsIgnoreCase("CUSTOMER") || user.getRole().getRoleName().equalsIgnoreCase("MANAGER"))) {
                return null;
            }
            user.setFullName(userDTO.getFullName());
            user.setEmail(userDTO.getEmail());
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setAddress(userDTO.getAddress());
            user.setStatus(userDTO.getStatus());
            User savedUser = userRepository.save(user);
            return mapToUserDto(savedUser);
        }).orElse(null);
    }

    public UserDTO updateCustomerProfileByEmail(String email, UserDTO userDTO) {
        return userRepository.findByEmail(email).map(user -> {
            if (user.getRole() == null || !user.getRole().getRoleName().equalsIgnoreCase("CUSTOMER")) {
                return null;
            }
            user.setFullName(userDTO.getFullName());
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setAddress(userDTO.getAddress());
            user.setDateOfBirth(userDTO.getDateOfBirth());
            user.setGender(userDTO.getGender());
            User savedUser = userRepository.save(user);
            return mapToUserDto(savedUser);
        }).orElse(null);
    }
}