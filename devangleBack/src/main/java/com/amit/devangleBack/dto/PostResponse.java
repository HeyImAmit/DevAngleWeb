package com.amit.devangleBack.dto;

import java.time.LocalDateTime;
import java.util.Set;

public class PostResponse {

    private Long id;
    private String title;
    private String content;
    private String author;
    private String authorEmail;
    private String authorAvatar;
    private LocalDateTime createdAt;
    private Set<String> tags;
    private int likesCount;
    private int commentsCount;
    private boolean likedByCurrentUser;

    public PostResponse() {
    }

    public PostResponse(Long id, String title, String content, String author, String authorEmail, String authorAvatar, LocalDateTime createdAt, Set<String> tags, int likesCount, int commentsCount) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.authorEmail = authorEmail;
        this.authorAvatar = authorAvatar;
        this.createdAt = createdAt;
        this.tags = tags;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthorEmail() {
        return authorEmail;
    }

    public void setAuthorEmail(String authorEmail) {
        this.authorEmail = authorEmail;
    }

    public String getAuthorAvatar() {
        return authorAvatar;
    }

    public void setAuthorAvatar(String authorAvatar) {
        this.authorAvatar = authorAvatar;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }

    public boolean isLikedByCurrentUser() {
        return likedByCurrentUser;
    }

    public void setLikedByCurrentUser(boolean likedByCurrentUser) {
        this.likedByCurrentUser = likedByCurrentUser;
    }

    @Override
    public String toString() {
        return "PostResponse{"
                + "id=" + id
                + ", title='" + title + '\''
                + ", author='" + author + '\''
                + ", authorEmail='" + authorEmail + '\''
                + ", authorAvatar='" + authorAvatar + '\''
                + ", createdAt=" + createdAt
                + ", tags=" + tags
                + ", likesCount=" + likesCount
                + ", commentsCount=" + commentsCount
                + '}';
    }
}
