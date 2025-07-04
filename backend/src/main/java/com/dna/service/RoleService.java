package com.dna.service;

import com.dna.entity.Role;
import com.dna.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@org.springframework.stereotype.Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(Integer id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(Integer id, Role roleDetails) {
        Role role = getRoleById(id);
        role.setRoleName(roleDetails.getRoleName());
        return roleRepository.save(role);
    }

    public void deleteRole(Integer id) {
        Role role = getRoleById(id);
        roleRepository.delete(role);
    }

    public Role getRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }
}
