package com.mdd.API.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mdd.API.model.User;

import java.time.LocalDateTime;

public class UserDTO {
    private long id;
    private String username;
    private String email;
    private boolean admin;  // Ajouter ce champ
    private String password;  // Ajouter ce champ

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserDTO() {
        // Constructeur par défaut requis pour la désérialisation
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.admin = user.getAdmin();  // Ajouter cette ligne
        this.password = user.getPassword();  // Ajouter cette ligne
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
    public UserDTO(Long id, String username, String email, boolean admin, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.admin = admin;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UserDTO(Long id, String username, String email, boolean admin, String password, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.admin = admin;  // Ajouter ce paramètre
        this.password = password;  // Ajouter ce paramètre
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public boolean isAdmin() {
        return admin;  // Ajouter ce getter
    }

    public String getPassword() {
        return password;  // Ajouter ce getter
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;  // Ajouter ce setter
    }

    public void setPassword(String password) {
        this.password = password;  // Ajouter ce setter
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
