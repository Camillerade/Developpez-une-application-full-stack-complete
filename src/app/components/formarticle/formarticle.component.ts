import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { Article } from 'src/app/interfaces/Article.interface';

@Component({
  selector: 'app-formarticle',
  templateUrl: './formarticle.component.html',
  styleUrls: ['./formarticle.component.scss']
})
export class CreateArticleComponent implements OnInit {
  articleForm: FormGroup;
  themes: Theme[] = [];
  currentUserId: string = ''; // Initialisation avec une valeur par défaut

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private articleService: ArticleService,
    private router: Router,
    private authService: AuthService
  ) {
    this.articleForm = this.fb.group({
      theme: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.maxLength(254)]]
    });
  }

  naviguerVersThemes(): void {
    this.router.navigate(['/themes']);
  }

  naviguerVersArticles(): void {
    this.router.navigate(['/articles']);
  }

  naviguerVersFormArticle(): void {
    this.router.navigate(['/formarticle']);
  }

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur connecté
    this.authService.me().subscribe(
      (user: User) => {
        this.currentUserId = user.id.toString(); // Convertir en chaîne de caractères si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
      }
    );

    this.themeService.getThemes().subscribe(
      (data: Theme[]) => {
        this.themes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des thèmes', error);
      }
    );
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      // Formater la date sans le "Z"
      const now = new Date();
      const createdAt = now.toISOString().slice(0, -1); 
      const updatedAt = now.toISOString().slice(0, -1); 
  
      const nouvelArticle = {
        title: this.articleForm.value.title,
        description: this.articleForm.value.description,
        authorId: +this.currentUserId,
        created_at: createdAt,
        updated_at: updatedAt,
        theme: this.articleForm.value.theme
      };
  
      this.articleService.createArticle(nouvelArticle).subscribe(
        () => {
          console.log('Article créé avec succès');
          this.router.navigate(['/articles']);
        },
        (error) => {
          console.error('Erreur lors de la création de l\'article', error);
        }
      );
    }
  }
  
  
  
}  