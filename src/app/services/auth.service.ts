import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { AuthSuccess } from '../interfaces/AuthSuccess';
import { LoginRequest } from '../interfaces/LoginRequest';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pathService = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/register`, registerRequest);
  }
  public deleteUser(userId: string): Observable<void> {
    const token = localStorage.getItem('token'); // Assurez-vous que le jeton est stocké lors de la connexion
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<void>(`${this.pathService}/user/${userId}`, { headers });
  }
  
  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/login`, loginRequest).pipe(
      tap((response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
      })
    );
  }
  public updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<User>(`${this.pathService}/update`, user, { headers });
  }
  
  public me(): Observable<User> {
    const token = localStorage.getItem('token'); // Assurez-vous que le jeton est stocké lors de la connexion
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User>(`${this.pathService}/me`, { headers });
  }
}
