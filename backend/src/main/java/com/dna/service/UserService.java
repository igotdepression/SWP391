package com.dna.service;

import com.dna.dto.UserDTO;
import com.dna.entity.User;
import com.dna.entity.Role;
import com.dna.repository.UserRepository;
import com.dna.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Service s3Service;
    
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
    
    // Tạo user mới với đầy đủ thông tin
    public UserDTO createStaffOrManager(UserDTO userDTO) {
        // Kiểm tra email đã tồn tại chưa
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã được sử dụng!");
        }
        
        // Kiểm tra role hợp lệ - chỉ cho phép tạo STAFF, MANAGER, ADMIN
        if (userDTO.getRole() == null || 
            (!userDTO.getRole().equalsIgnoreCase("STAFF") && 
             !userDTO.getRole().equalsIgnoreCase("MANAGER") && 
             !userDTO.getRole().equalsIgnoreCase("ADMIN"))) {
            throw new RuntimeException("Chỉ được phép tạo user với vai trò STAFF, MANAGER hoặc ADMIN!");
        }
        
        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        user.setStatus(userDTO.getStatus());
        
        // Set password (nếu có) - encode password trước khi lưu
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        } else {
            throw new RuntimeException("Mật khẩu không được để trống!");
        }
        
        // Set role dựa trên roleName
        Role role = getRoleByName(userDTO.getRole());
        if (role != null) {
            user.setRole(role);
        } else {
            throw new RuntimeException("Vai trò không hợp lệ: " + userDTO.getRole());
        }
       
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

    // Không xóa vật lý user, chỉ cập nhật status thành "BỊ KHÓA"
    public UserDTO deactivateUser(Integer id) {
        return userRepository.findById(id).map(user -> {
            user.setStatus("BỊ KHÓA");
            User savedUser = userRepository.save(user);
            return mapToUserDto(savedUser);
        }).orElse(null);
    }
    
    // Mở khóa người dùng - cập nhật status thành "HOẠT ĐỘNG"
    public UserDTO activateUser(Integer id) {
        return userRepository.findById(id).map(user -> {
            user.setStatus("HOẠT ĐỘNG");
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
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setIdCardUrl(user.getIdCardUrl());
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
    
    // Helper method để lấy role theo tên
    private Role getRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName).orElse(null);
    }

    // Upload avatar cho user
    public String uploadAvatar(Integer userId, MultipartFile file) throws IOException {
        try {
            System.out.println("=== UserService: Bắt đầu upload avatar ===");
            System.out.println("User ID: " + userId);
            
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
            
            System.out.println("User found: " + user.getFullName());
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());
            
            // Test S3 connection first
            System.out.println("UserService: Testing S3 connection...");
            boolean s3Connected = s3Service.testConnection();
            System.out.println("UserService: S3 connection test result: " + s3Connected);
            
            if (!s3Connected) {
                throw new RuntimeException("S3 connection failed");
            }
            
            String fileUrl = s3Service.uploadFile(file);
            System.out.println("UserService: File uploaded to S3: " + fileUrl);
            
            user.setAvatarUrl(fileUrl);
            userRepository.save(user);
            System.out.println("UserService: Avatar URL saved to database");
            
            System.out.println("=== UserService: Upload avatar thành công ===");
            return fileUrl;
        } catch (Exception e) {
            System.err.println("=== UserService: Lỗi upload avatar ===");
            System.err.println("Error type: " + e.getClass().getSimpleName());
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            throw new IOException("Không thể upload avatar: " + e.getMessage(), e);
        }
    }

    // Upload ID card cho user
    public String uploadIdCard(Integer userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String fileUrl = s3Service.uploadFile(file);
        user.setIdCardUrl(fileUrl);
        userRepository.save(user);
        
        return fileUrl;
    }
}