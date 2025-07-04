package com.dna.controller;

import com.dna.dto.UserDTO;
import com.dna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    
    @PreAuthorize("hasRole('ADMIN')")  
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

    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("customer/profile/{id}")
    public ResponseEntity<UserDTO> updateProfileCustomer(@PathVariable Integer id){
        UserDTO updateToCustomer = userService.updateToCustomer(id, null);
        return ResponseEntity.ok(updateToCustomer);
    }
}




