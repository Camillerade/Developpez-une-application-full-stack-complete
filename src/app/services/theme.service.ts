import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme } from '../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private apiUrl = 'http://localhost:8080/api/themes';

  constructor(private http: HttpClient) {}

  getThemes(): Observable<Theme[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajoutez votre token si nécessaire
    });

    return this.http.get<Theme[]>(this.apiUrl, { headers });
  }

  createTheme(theme: Theme): Observable<Theme> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Theme>(this.apiUrl, theme, { headers });
  }

  deleteTheme(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
