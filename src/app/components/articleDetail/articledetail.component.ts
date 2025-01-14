import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/CommentService';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/interfaces/Article.interface';
import { Comment } from 'src/app/interfaces/Comment';
import { User } from 'src/app/interfaces/user.interface';
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
  currentUser: User | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  navigateToThemes(): void {
    this.router.navigate(['/themes']);
  }
  logout(): void { localStorage.removeItem('token'); this.router.navigate(['/login']);}
  
  navigateToArticle(): void {
    this.router.navigate(['/articles']);
  }

 
  navigateToMe(): void { this.router.navigate(['/me']); }

  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id')!;
    this.loadArticle(articleId);
    this.loadComments(articleId); // Charger les commentaires liés à l'article
    this.loadCurrentUser(); // Charger les infos de l'utilisateur connecté
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

  loadCurrentUser(): void {
    this.authService.me().subscribe(
      (data: User) => {
        this.currentUser = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    );
  }

  addComment(): void {
    if (this.newComment.trim() && this.currentUser) {
      const comment: Comment = {
        content: this.newComment,
        date: new Date().toISOString(),
        author: {
          id: this.currentUser.id,
          username: this.currentUser.username
        },
        article: {
          id: this.article!.id
        }
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
