package com.amit.devangleBack.service;

import java.util.List;

import com.amit.devangleBack.dto.PostRequest;
import com.amit.devangleBack.dto.PostResponse;

public interface PostService {
    PostResponse createPost(PostRequest request, String userEmail);
    List<PostResponse> getAllPosts();
    PostResponse getPostById(Long id);
    PostResponse getPostById(Long id, String userEmail);
    PostResponse updatePost(Long id, PostRequest request, String userEmail);
    void deletePost(Long id, String userEmail);
    List<PostResponse> getPostsByTag(String tag);
}
