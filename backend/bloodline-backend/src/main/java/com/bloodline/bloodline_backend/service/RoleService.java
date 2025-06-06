package com.bloodline.bloodline_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bloodline.bloodline_backend.entity.Role;
import com.bloodline.bloodline_backend.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Lombok sẽ tự tạo constructor với các final fields
public class RoleService {
    private final RoleRepository roleRepository;

    // Xóa bỏ annotation @Autowired ở đây
    // Constructor được tạo tự động bởi @RequiredArgsConstructor
    
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    
    public Role getRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }
    
    public Role getRoleById(Integer id) {
        return roleRepository.findById(id).orElse(null);
    }
}
