package com.bloodline.bloodline_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bloodline.bloodline_backend.entity.Role;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    // Phương thức này phù hợp với cách gọi trong RoleService
    @Query("SELECT r FROM Role r WHERE r.roleName = ?1")
    Optional<Role> findByRoleName(String roleName);
}
