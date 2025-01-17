package com.mdd.API.Service;

import com.mdd.API.model.Abonnement;
import com.mdd.API.Repository.AbonnementRepository;
import com.mdd.API.model.AbonnementId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbonnementService {
    @Autowired
    private AbonnementRepository abonnementRepository;

    public Abonnement saveAbonnement(Abonnement abonnement) {
        return abonnementRepository.save(abonnement);
    }

    public List<Abonnement> getAllAbonnements() {
        return abonnementRepository.findAll();
    }

    public List<Abonnement> findByUserId(Long userId) {
        List<Abonnement> abonnements = abonnementRepository.findByIdUsers(userId);
        // Charger les thèmes associés à chaque abonnement
        abonnements.forEach(abonnement -> {
            abonnement.setTheme(abonnementRepository.findThemeById(abonnement.getIdTheme()));
        });
        return abonnements;
    }

    public void deleteAbonnement(AbonnementId abonnementId) {
        abonnementRepository.deleteById(abonnementId);
    }
}
