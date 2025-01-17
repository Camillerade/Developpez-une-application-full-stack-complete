package com.mdd.API.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class ArticleDTO {
    private long id;
    private String title;
    private String description;
    private long authorId;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS") // Format ISO 8601
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS") // Format ISO 8601
    private LocalDateTime updatedAt;

    private long theme;

    // Constructeur par défaut requis pour la désérialisation
    public ArticleDTO() {
    }

    public ArticleDTO(long id, String title, String description, long authorId, LocalDateTime createdAt, LocalDateTime updatedAt, long theme) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authorId = authorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.theme = theme;
    }

    public ArticleDTO(long id, String title, String description, long authorId, LocalDateTime date, long theme) { 
        this.id = id; 
        this.title = title; 
        this.description = description; 
        this.authorId = authorId; 
        this.createdAt = date; // ou this.updatedAt = date, selon ce que vous utilisez 
        this.theme = theme;
    }

    // Getters
    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public long getAuthorId() {
        return authorId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public long getTheme() {
        return theme;
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAuthorId(long authorId) {
        this.authorId = authorId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setTheme(long theme) {
        this.theme = theme;
    }
}
