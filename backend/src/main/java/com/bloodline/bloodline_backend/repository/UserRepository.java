package com.bloodline.bloodline_backend.repository;

import com.bloodline.bloodline_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRoleRoleID(Integer roleID);
    List<User> findByStatus(String status);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
} 