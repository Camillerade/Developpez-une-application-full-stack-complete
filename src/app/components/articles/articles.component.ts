import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/interfaces/Article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService, private router: Router) {}

  navigateToThemes(): void {
    this.router.navigate(['/themes']);
  }
  logout(): void { localStorage.removeItem('token'); this.router.navigate(['/login']);}
  
  navigateToArticle(): void {
    this.router.navigate(['/articles']);
  }

 
  navigateToMe(): void { this.router.navigate(['/me']); }

  navigateToCreateArticle(): void {
    this.router.navigate(['/formarticle']);
  }
  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
      (data: Article[]) => {
        this.articles = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );
  }
  viewArticle(articleId: number): void { this.router.navigate(['/articles', articleId]);
}
}