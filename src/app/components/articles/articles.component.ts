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

  navigateToArticle(): void {
    this.router.navigate(['/articles']);
  }

  navigateToCreateArticle(): void {
    this.router.navigate(['/formarticle']);
  }
  navigateToMe(): void { this.router.navigate(['/me']); }
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