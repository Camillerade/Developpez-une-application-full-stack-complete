import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnement } from '../interfaces/Abonnement';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  private apiUrl = 'http://localhost:8080/api/abonnement';

  constructor(private http: HttpClient) {}

  getUserAbonements(userId: number): Observable<Abonnement[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Abonnement[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  subscribeToTheme(userId: number, themeId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { idUsers: userId, idTheme: themeId };

    return this.http.post(this.apiUrl, body, { headers });
  }

  unsubscribeFromTheme(userId: number, themeId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}?id_users=${userId}&id_theme=${themeId}`, { headers });
  }
}
