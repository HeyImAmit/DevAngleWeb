package com.amit.devangleBack.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amit.devangleBack.dto.PostRequest;
import com.amit.devangleBack.dto.PostResponse;
import com.amit.devangleBack.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public PostResponse createPost(@RequestBody PostRequest request, Authentication authentication) {
        String email = authentication.getName();
        return postService.createPost(request, email);
    }

    @GetMapping
    public List<PostResponse> getAllPosts(@RequestParam(required = false) String tag) {
        if(tag != null) {
            return postService.getPostsByTag(tag);
        }
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostResponse getPost(@PathVariable Long id, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            return postService.getPostById(id, email);
        } else {
            return postService.getPostById(id);
        }
    }

    @PutMapping("/{id}")
    public PostResponse updatePost(@PathVariable Long id,
            @RequestBody PostRequest request,
            Authentication authentication) {
        return postService.updatePost(id, request, authentication.getName());
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id, Authentication authentication) {
        postService.deletePost(id, authentication.getName());
    }

    @GetMapping("/test")
    public String test() {
        return "Backend is working!";
    }
}
