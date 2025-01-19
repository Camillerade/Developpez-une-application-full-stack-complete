package com.mdd.API.Controller;

import com.mdd.API.Service.AbonnementService;
import com.mdd.API.model.Abonnement;
import com.mdd.API.model.AbonnementId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/abonnement")
public class abonnementController {

    @Autowired
    private AbonnementService abonnementService;

    @PostMapping
    public ResponseEntity<Abonnement> createAbonnement(@RequestBody Abonnement abonnement) {
        try {
            Abonnement savedAbonnement = abonnementService.saveAbonnement(abonnement);
            return new ResponseEntity<>(savedAbonnement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Abonnement>> getUserAbonnements(@PathVariable Long userId) {
        try {
            List<Abonnement> abonnements = abonnementService.findByUserId(userId);
            return new ResponseEntity<>(abonnements, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAbonnement(@RequestParam Long id_users, @RequestParam Long id_theme) {
        try {
            AbonnementId abonnementId = new AbonnementId();
            abonnementId.setIdUsers(id_users);
            abonnementId.setIdTheme(id_theme);
            abonnementService.deleteAbonnement(abonnementId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
