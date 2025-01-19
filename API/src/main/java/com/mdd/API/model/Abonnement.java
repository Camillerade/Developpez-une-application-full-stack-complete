package com.mdd.API.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@IdClass(AbonnementId.class)
public class Abonnement {
    @Id
    private Long idUsers;

    @Id
    private Long idTheme;

    @ManyToOne
    @JoinColumn(name = "idTheme", insertable = false, updatable = false)
    private Theme theme;

    // Getters et Setters
    public Long getIdUsers() {
        return idUsers;
    }

    public void setIdUsers(Long idUsers) {
        this.idUsers = idUsers;
    }

    public Long getIdTheme() {
        return idTheme;
    }

    public void setIdTheme(Long idTheme) {
        this.idTheme = idTheme;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }
}
