package com.amit.devangleBack.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amit.devangleBack.model.Post;
import com.amit.devangleBack.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor(User author);
}

