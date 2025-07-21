package com.amit.devangleBack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amit.devangleBack.dto.CommentRequest;
import com.amit.devangleBack.dto.CommentResponse;
import com.amit.devangleBack.service.CommentService;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public CommentResponse addComment(@PathVariable Long postId,
                                      @RequestBody CommentRequest request,
                                      Authentication authentication) {
        return commentService.addComment(postId, request, authentication.getName());
    }

    @GetMapping
    public List<CommentResponse> getComments(@PathVariable Long postId) {
        return commentService.getCommentsForPost(postId);
    }
}

