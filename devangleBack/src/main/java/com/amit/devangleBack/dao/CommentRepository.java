package com.amit.devangleBack.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amit.devangleBack.model.Comment;
import com.amit.devangleBack.model.Post;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}
