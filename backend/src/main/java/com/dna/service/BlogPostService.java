package com.dna.service;

import com.dna.entity.BlogPost;
import com.dna.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogPostService {
    private final BlogPostRepository blogPostRepository;

    public List<BlogPost> getAllVisibleBlogPosts() {
        return blogPostRepository.findByHiddenFalse();
    }

    public Optional<BlogPost> getBlogPostById(Long id) {
        return blogPostRepository.findById(id).filter(bp -> !Boolean.TRUE.equals(bp.getHidden()));
    }

    public List<BlogPost> searchBlogPosts(String keyword) {
        return blogPostRepository.findByTitleContainingIgnoreCaseAndHiddenFalse(keyword);
    }

    public List<BlogPost> getAllBlogPostsForManager() {
        return blogPostRepository.findAll();
    }

    public BlogPost createBlogPost(BlogPost blogPost) {
        blogPost.setHidden(false);
        return blogPostRepository.save(blogPost);
    }

    public BlogPost updateBlogPost(Long id, BlogPost updated) {
        return blogPostRepository.findById(id).map(bp -> {
            bp.setTitle(updated.getTitle());
            bp.setContent(updated.getContent());
            bp.setUpdatedDate(updated.getUpdatedDate());
            // cập nhật các trường khác nếu cần
            return blogPostRepository.save(bp);
        }).orElseThrow(() -> new RuntimeException("BlogPost not found"));
    }

    public BlogPost setHidden(Long id, boolean hidden) {
        return blogPostRepository.findById(id).map(bp -> {
            bp.setHidden(hidden);
            return blogPostRepository.save(bp);
        }).orElseThrow(() -> new RuntimeException("BlogPost not found"));
    }
} 