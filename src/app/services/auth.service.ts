import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Importer Router
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { AuthSuccess } from '../interfaces/AuthSuccess';
import { LoginRequest } from '../interfaces/LoginRequest';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private pathService = 'http://localhost:8080/api/auth';
  router: Router;
 

  constructor(private httpClient: HttpClient, router: Router) { // Injecter le Router
    this.router = router; // Assigner le Router à la propriété router
  }

  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    // Supprimer la cryptage du mot de passe
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/register`, registerRequest);
  }
  
  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/login`, loginRequest).pipe(
      map(response => ({
        token: response.token,
        user: response.user // Assure-toi que la réponse contient un champ user
      }))
    );
  }
  public logout(): void {
    console.log('Déconnexion demandée'); // Log supplémentaire
    localStorage.removeItem('token'); // Supprimer le token de stockage local
    console.log('Token supprimé'); // Log supplémentaire
    this.router.navigate(['/']); // Rediriger vers la page d'accueil
    console.log('Redirection vers /home'); // Log supplémentaire
  }
  
  public updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<User>(`${this.pathService}/update`, user, { headers });
  }
  
  public deleteUser(userId: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<void>(`${this.pathService}/user/${userId}`, { headers });
  }


  public me(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User>(`${this.pathService}/me`, { headers });
  }
}
