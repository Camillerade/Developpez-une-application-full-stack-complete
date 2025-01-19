package com.mdd.API.DTO;

public class CommentDTO {
    private String content;
    private String authorUsername;

    public CommentDTO(String content, String authorUsername) {
        this.content = content;
        this.authorUsername = authorUsername;
    }

    // Getters et Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }
}
