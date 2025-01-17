package com.mdd.API.Controller;

import com.mdd.API.DTO.ArticleDTO;
import com.mdd.API.Repository.ArticleRepository;
import com.mdd.API.Repository.ThemeRepository;
import com.mdd.API.Repository.UserRepository;
import com.mdd.API.Service.ArticleService;
import com.mdd.API.model.Article;
import com.mdd.API.model.Theme;
import com.mdd.API.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ThemeRepository themeRepository;
    
    @Autowired
    private ArticleRepository articleRepository;
    
    @PostMapping
    public ArticleDTO createArticle(@RequestBody ArticleDTO articleDTO) {
        // Vérifiez l'existence de l'auteur
        User author = userRepository.findById(articleDTO.getAuthorId())
            .orElseThrow(() -> new RuntimeException("Auteur non trouvé"));

        // Vérifiez l'existence du thème
        Theme theme = themeRepository.findById(articleDTO.getTheme())
            .orElseThrow(() -> new RuntimeException("Thème non trouvé"));

        // Créez un nouvel article
        Article article = new Article(
            articleDTO.getTitle(),
            articleDTO.getDescription(),
            author,
            LocalDateTime.parse(articleDTO.getCreatedAt().toString()), // Assurez-vous que createdAt est une chaîne formatée correctement
            theme
        );

        // Sauvegardez l'article
        Article savedArticle = articleRepository.save(article);

        // Créez un ArticleDTO pour la réponse
        ArticleDTO savedArticleDTO = new ArticleDTO(
            savedArticle.getId(),
            savedArticle.getTitle(),
            savedArticle.getDescription(),
            savedArticle.getAuthor().getId(),
            savedArticle.getDate(),
            savedArticle.getTheme().getId()
        );

        return savedArticleDTO;
    }
 
    @GetMapping("/{id}") 
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) { 
    	Optional<Article> article = articleService.getArticleById(id); 
    	if (article.isPresent()) { 
    		return ResponseEntity.ok(article.get()); 
    	} else { 
    		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    	}
    }



    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }
}
