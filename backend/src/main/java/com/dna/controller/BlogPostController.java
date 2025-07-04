package com.dna.controller;

import com.dna.entity.BlogPost;
import com.dna.service.BlogPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogposts")
@RequiredArgsConstructor
public class BlogPostController {
    private final BlogPostService blogPostService;

    // CUSTOMER: Lấy danh sách blogpost hiển thị
    @GetMapping("")
    public ResponseEntity<List<BlogPost>> getAllVisibleBlogPosts() {
        return ResponseEntity.ok(blogPostService.getAllVisibleBlogPosts());
    }

    // CUSTOMER: Xem chi tiết blogpost
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        return blogPostService.getBlogPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CUSTOMER: Tìm kiếm blogpost
    @GetMapping("/search")
    public ResponseEntity<List<BlogPost>> searchBlogPosts(@RequestParam String keyword) {
        return ResponseEntity.ok(blogPostService.searchBlogPosts(keyword));
    }

    // MANAGER: Lấy tất cả blogpost (bao gồm ẩn)
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/manager/all")
    public ResponseEntity<List<BlogPost>> getAllBlogPostsForManager() {
        return ResponseEntity.ok(blogPostService.getAllBlogPostsForManager());
    }

    // MANAGER: Tạo mới blogpost
    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/manager")
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        return ResponseEntity.ok(blogPostService.createBlogPost(blogPost));
    }

    // MANAGER: Cập nhật blogpost
    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/manager/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable Long id, @RequestBody BlogPost blogPost) {
        return ResponseEntity.ok(blogPostService.updateBlogPost(id, blogPost));
    }

    // MANAGER: Ẩn/hiện blogpost
    @PreAuthorize("hasRole('MANAGER')")
    @PatchMapping("/manager/{id}/hidden")
    public ResponseEntity<BlogPost> setHidden(@PathVariable Long id, @RequestParam boolean hidden) {
        return ResponseEntity.ok(blogPostService.setHidden(id, hidden));
    }
} 