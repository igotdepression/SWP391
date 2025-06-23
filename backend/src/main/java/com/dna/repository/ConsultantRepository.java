package com.dna.repository;

import com.dna.entity.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Integer> {
    // Có thể thêm các phương thức tìm kiếm tùy chỉnh nếu cần, ví dụ:
    // List<Consultant> findByUserId(Integer userId);
    // List<Consultant> findByStatus(String status);
}