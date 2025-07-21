package com.amit.devangleBack.dto;

import java.util.Set;

public class PostRequest {

    private String title;
    private String content;
    private Set<String> tags;

    public PostRequest() {
    }

    public PostRequest(String title, String content, Set<String> tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
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

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "PostRequest{"
                + "title='" + title + '\''
                + ", content='" + content + '\''
                + ", tags=" + tags
                + '}';
    }
}
