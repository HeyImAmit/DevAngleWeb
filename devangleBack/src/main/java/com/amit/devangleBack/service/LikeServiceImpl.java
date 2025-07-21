package com.amit.devangleBack.service;

import org.springframework.stereotype.Service;

import com.amit.devangleBack.dao.LikeRepository;
import com.amit.devangleBack.dao.PostRepository;
import com.amit.devangleBack.dao.UserRepository;
import com.amit.devangleBack.model.Like;
import com.amit.devangleBack.model.Post;
import com.amit.devangleBack.model.User;

@Service
public class LikeServiceImpl implements LikeService {

    private LikeRepository likeRepository;
    private PostRepository postRepository;
    private UserRepository userRepository;

    public LikeServiceImpl(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String toggleLike(Long postId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Check if already liked
        Like existingLike = likeRepository.findByUserAndPost(user, post).orElse(null);

        if (existingLike != null) {
            likeRepository.delete(existingLike);
            return "Unliked";
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setPost(post);
            likeRepository.save(like);
            return "Liked";
        }
    }

    @Override
    public int getLikeCount(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return post.getLikes().size();
    }
}
