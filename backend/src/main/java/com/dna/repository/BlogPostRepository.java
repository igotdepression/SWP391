package com.dna.repository;

import com.dna.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByHiddenFalse();
    List<BlogPost> findByTitleContainingIgnoreCaseAndHiddenFalse(String keyword);
    // Thêm các phương thức custom nếu cần
}