package com.amit.devangleBack.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amit.devangleBack.model.Like;
import com.amit.devangleBack.model.Post;
import com.amit.devangleBack.model.User;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndPost(User user, Post post);
}

