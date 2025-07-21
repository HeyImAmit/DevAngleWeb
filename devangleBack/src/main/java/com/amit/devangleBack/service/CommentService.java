package com.amit.devangleBack.service;

import java.util.List;

import com.amit.devangleBack.dto.CommentRequest;
import com.amit.devangleBack.dto.CommentResponse;

public interface CommentService {
    CommentResponse addComment(Long postId, CommentRequest request, String userEmail);
    List<CommentResponse> getCommentsForPost(Long postId);
}
