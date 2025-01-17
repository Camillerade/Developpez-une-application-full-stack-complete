package com.mdd.API.Repository;

import com.mdd.API.model.Abonnement;
import com.mdd.API.model.AbonnementId;
import com.mdd.API.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbonnementRepository extends JpaRepository<Abonnement, AbonnementId> {
    List<Abonnement> findByIdUsers(Long idUsers);

    @Query("SELECT t FROM Theme t WHERE t.id = :idTheme")
    Theme findThemeById(Long idTheme);
}
