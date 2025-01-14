import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/CommentService';
import { Article } from 'src/app/interfaces/Article.interface';
import { Comment } from 'src/app/interfaces/Comment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  comments: Comment[] = [];
  newComment: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    @Inject(CommentService) private commentService: CommentService
  ) {}

  navigateToThemes(): void {
    this.router.navigate(['/themes']);
  }

  navigateToMe(): void {
    this.router.navigate(['/me']);
  }

  navigateToArticle(): void {
    this.router.navigate(['/articles']);
  }

  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id')!;
    this.loadArticle(articleId);
    this.loadComments(articleId);
  }

  loadArticle(articleId: number): void {
    this.articleService.getArticleById(articleId).subscribe(
      (data: Article) => {
        this.article = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'article', error);
      }
    );
  }

  loadComments(articleId: number): void {
    this.commentService.getCommentsByArticleId(articleId).subscribe(
      (data: Comment[]) => {
        this.comments = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }

  addComment(): void {
    if (this.newComment.trim()) {
      const comment: Comment = {
        content: this.newComment,
        date: new Date().toISOString(),
        author: {
          id: 0, // Remplacez par l'ID de l'utilisateur connecté
          username: 'Utilisateur' // Remplacez par le nom d'utilisateur de l'utilisateur connecté
        },
        articleId: this.article!.id
      };
      
      this.commentService.addComment(comment).subscribe(
        (data: Comment) => {
          this.comments.push(data);
          this.newComment = '';
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du commentaire', error);
        }
      );
    }
  }
}
