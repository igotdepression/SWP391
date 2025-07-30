package com.dna.controller;

import com.dna.dto.UserDTO;
import com.dna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        UserDTO user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile(Authentication authentication) {
        String email = authentication.getName();
        UserDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    // ADMIN ONLY: Quản lý nhân viên                          
    @PreAuthorize("hasRole('ADMIN')")                         
    @PostMapping                                                   
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {                    
        // Chỉ cho phép tạo user với role STAFF hoặc MANAGER                         
        UserDTO createdUser = userService.createStaffOrManager(userDTO);                
        if (createdUser == null) return ResponseEntity.status(403).build();                
        return ResponseEntity.ok(createdUser);    
    }
    
    @PutMapping("/{id}")   
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer id, @RequestBody UserDTO userDTO) {   
        // Chỉ cho phép update hồ sơ cho STAFF hoặc MANAGER, không cho phép update customer   
        UserDTO updatedUser = userService.updateStaffOrManager(id, userDTO);   
        if (updatedUser == null) return ResponseEntity.status(403).build();   
        return ResponseEntity.ok(updatedUser);   
    }

    @PreAuthorize("hasRole('ADMIN')")     
    @PutMapping("/{id}/deactivate")     
    public ResponseEntity<UserDTO> deactivateUser(@PathVariable Integer id) {   
        // Không xóa vật lý user, chỉ cập nhật status
        UserDTO deactivatedUser = userService.deactivateUser(id);   
        return deactivatedUser != null ? ResponseEntity.ok(deactivatedUser) : ResponseEntity.notFound().build();    
    }
    
    @PreAuthorize("hasRole('ADMIN')")     
    @PutMapping("/{id}/activate")     
    public ResponseEntity<UserDTO> activateUser(@PathVariable Integer id) {   
        // Mở khóa người dùng - cập nhật status thành hoạt động
        UserDTO activatedUser = userService.activateUser(id);   
        return activatedUser != null ? ResponseEntity.ok(activatedUser) : ResponseEntity.notFound().build();    
    }

    @PutMapping("customer/profile/{id}")
    public ResponseEntity<UserDTO> updateProfileCustomer(@PathVariable Integer id, @RequestBody UserDTO userDTO){
        UserDTO updateToCustomer = userService.updateToCustomer(id, userDTO);
        return ResponseEntity.ok(updateToCustomer);
    }

    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF', 'MANAGER')")
    @PutMapping("/profile/update")
    public ResponseEntity<UserDTO> updateCustomerProfile(Authentication authentication, @RequestBody UserDTO userDTO) {
        String email = authentication.getName();
        UserDTO updated = userService.updateCustomerProfileByEmail(email, userDTO);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Upload avatar cho user
    @PostMapping("/{id}/avatar")
    public ResponseEntity<Map<String, String>> uploadAvatar(@PathVariable Integer id, @RequestParam("file") MultipartFile file) {
        try {
            System.out.println("=== UserController: Bắt đầu upload avatar ===");
            System.out.println("User ID: " + id);
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());
            System.out.println("File content type: " + file.getContentType());
            
            if (file.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "File rỗng");
                return ResponseEntity.badRequest().body(response);
            }
            
            String fileUrl = userService.uploadAvatar(id, file);
            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            response.put("message", "Upload avatar thành công");
            System.out.println("=== UserController: Upload avatar thành công ===");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("=== UserController: Lỗi upload avatar ===");
            System.err.println("Error type: " + e.getClass().getSimpleName());
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, String> response = new HashMap<>();
            response.put("error", "Không thể upload avatar: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Get avatar for user (fallback endpoint)
    @GetMapping("/{id}/avatar")
    public ResponseEntity<UserDTO> getUserAvatar(@PathVariable Integer id) {
        UserDTO user = userService.getUserById(id);
        if (user != null && user.getAvatarUrl() != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    // Upload ID card cho user
    @PostMapping("/{id}/idcard")
    public ResponseEntity<Map<String, String>> uploadIdCard(@PathVariable Integer id, @RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = userService.uploadIdCard(id, file);
            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            response.put("message", "Upload CMND/CCCD thành công");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Không thể upload CMND/CCCD: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}




