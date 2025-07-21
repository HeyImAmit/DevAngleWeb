package com.amit.devangleBack.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amit.devangleBack.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}

