package com.amit.devangleBack.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.amit.devangleBack.dao.PostRepository;
import com.amit.devangleBack.dao.TagRepository;
import com.amit.devangleBack.dao.UserRepository;
import com.amit.devangleBack.dto.PostRequest;
import com.amit.devangleBack.dto.PostResponse;
import com.amit.devangleBack.model.Post;
import com.amit.devangleBack.model.Tag;
import com.amit.devangleBack.model.User;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private UserRepository userRepository;
    private TagRepository tagRepository;

    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, TagRepository tagRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public PostResponse createPost(PostRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(author);

        // Tags
        Set<Tag> tags = new HashSet<>();
        for (String tagName : request.getTags()) {
            Tag tag = tagRepository.findByName(tagName)
                    .orElseGet(() -> {
                        Tag t = new Tag();
                        t.setName(tagName);
                        return tagRepository.save(t);
                    });
            tags.add(tag);
        }
        post.setTags(tags);

        postRepository.save(post);
        return mapToResponse(post);
    }

    @Override
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PostResponse getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToResponse(post);
    }

    public PostResponse getPostById(Long id, String userEmail) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToResponse(post, userEmail);
    }

    @Override
    public PostResponse updatePost(Long id, PostRequest request, String userEmail) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getAuthor().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        Set<Tag> tags = request.getTags().stream().map(tagName -> {
            return tagRepository.findByName(tagName).orElseGet(() -> {
                Tag tag = new Tag();
                tag.setName(tagName);
                return tagRepository.save(tag);
            });
        }).collect(Collectors.toSet());

        post.setTags(tags);
        postRepository.save(post);

        return mapToResponse(post);
    }

    @Override
    public void deletePost(Long id, String userEmail) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getAuthor().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        postRepository.delete(post);
    }

    @Override
    public List<PostResponse> getPostsByTag(String tagName) {
        Tag tag = tagRepository.findByName(tagName)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        return tag.getPosts().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PostResponse mapToResponse(Post post) {
        return mapToResponse(post, null);
    }

    private PostResponse mapToResponse(Post post, String userEmail) {
        PostResponse res = new PostResponse();
        res.setId(post.getId());
        res.setTitle(post.getTitle());
        res.setContent(post.getContent());
        res.setCreatedAt(post.getCreatedAt());
        res.setAuthor(post.getAuthor().getName());
        res.setAuthorEmail(post.getAuthor().getEmail());
        res.setAuthorAvatar(post.getAuthor().getAvatarUrl());
        res.setTags(post.getTags().stream().map(Tag::getName).collect(Collectors.toSet()));
        res.setLikesCount(post.getLikes().size());
        res.setCommentsCount(post.getComments().size());
        if (userEmail != null) {
            boolean liked = post.getLikes().stream().anyMatch(like -> like.getUser().getEmail().equals(userEmail));
            res.setLikedByCurrentUser(liked);
        } else {
            res.setLikedByCurrentUser(false);
        }
        return res;
    }
}
