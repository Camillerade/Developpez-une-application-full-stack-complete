package com.mdd.API.model;

import java.io.Serializable;
import java.util.Objects;

public class AbonnementId implements Serializable {
    private Long idUsers;
    private Long idTheme;

    // Getters, Setters, hashCode, equals
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbonnementId that = (AbonnementId) o;
        return Objects.equals(idUsers, that.idUsers) && Objects.equals(idTheme, that.idTheme);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsers, idTheme);
    }
}
