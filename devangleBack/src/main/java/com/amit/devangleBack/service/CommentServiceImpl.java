package com.amit.devangleBack.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.amit.devangleBack.dao.CommentRepository;
import com.amit.devangleBack.dao.PostRepository;
import com.amit.devangleBack.dao.UserRepository;
import com.amit.devangleBack.dto.CommentRequest;
import com.amit.devangleBack.dto.CommentResponse;
import com.amit.devangleBack.model.Comment;
import com.amit.devangleBack.model.Post;
import com.amit.devangleBack.model.User;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private UserRepository userRepository;
    private PostRepository postRepository;

    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CommentResponse addComment(Long postId, CommentRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setUser(user);

        commentRepository.save(comment);

        return mapToResponse(comment);
    }

    @Override
    public List<CommentResponse> getCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        List<Comment> comments = commentRepository.findByPost(post);

        return comments.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private CommentResponse mapToResponse(Comment comment) {
        CommentResponse res = new CommentResponse();
        res.setId(comment.getId());
        res.setContent(comment.getContent());
        res.setAuthor(comment.getUser().getName());
        res.setCreatedAt(comment.getCreatedAt());
        return res;
    }
}
