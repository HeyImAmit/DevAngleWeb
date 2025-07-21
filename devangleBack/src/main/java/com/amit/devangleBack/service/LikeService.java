package com.amit.devangleBack.service;

public interface LikeService {
    String toggleLike(Long postId, String userEmail);
    int getLikeCount(Long postId);
}
