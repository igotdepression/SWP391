package com.dna.controller;

import com.dna.dto.UserDTO;
import com.dna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/staff")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class StaffController {
    private final UserService userService;

    // Danh sách nhân viên
    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getAllStaff() {
        // Giả sử roleID = 2 là STAFF, 3 là MANAGER (cần xác nhận lại)
        List<UserDTO> staff = userService.getAllUsers().stream()
            .filter(u -> u.getRole().equalsIgnoreCase("STAFF") || u.getRole().equalsIgnoreCase("MANAGER"))
            .toList();
        return ResponseEntity.ok(staff);
    }

    // Thêm nhân viên
    @PostMapping("")
    public ResponseEntity<UserDTO> addStaff(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.createStaffOrManager(userDTO));
    }

    // Cập nhật nhân viên
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateStaff(@PathVariable Integer id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateStaffOrManager(id, userDTO));
    }

    // Xóa nhân viên (cập nhật status)
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<UserDTO> deactivateStaff(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.deactivateUser(id));
    }
} 