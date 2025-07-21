package com.amit.devangleBack.dto;

public class CommentRequest {

    private String content;

    public CommentRequest() {
    }

    public CommentRequest(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "CommentRequest{"
                + "content='" + content + '\''
                + '}';
    }
}
