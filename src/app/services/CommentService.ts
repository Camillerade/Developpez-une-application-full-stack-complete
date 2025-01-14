import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  getCommentsByArticleId(articleId: number): Observable<Comment[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Comment[]>(`${this.apiUrl}?articleId=${articleId}`, { headers });
  }

  addComment(comment: Comment): Observable<Comment> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Comment>(this.apiUrl, comment, { headers });
  }
}
