package com.amit.devangleBack.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amit.devangleBack.service.LikeService;

@RestController
@RequestMapping("/api/posts/{postId}/like")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping
    public String toggleLike(@PathVariable Long postId, Authentication authentication) {
        return likeService.toggleLike(postId, authentication.getName());
    }

    @GetMapping("/count")
    public int getLikeCount(@PathVariable Long postId) {
        return likeService.getLikeCount(postId);
    }

}
