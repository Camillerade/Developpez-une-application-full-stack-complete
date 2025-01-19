import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public isLogged = false;
  public user: User | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public setLoginStatus(status: boolean): void {
    this.isLogged = status;
    this.isLoggedSubject.next(this.isLogged);
  }

  public logIn(user: User): void {
    this.user = user;
    this.setLoginStatus(true); // Utilise la méthode setLoginStatus
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.user = undefined;
    this.isLogged = false;
    this.isLoggedSubject.next(this.isLogged);
  }

  public getUserId(): number | undefined {
    return this.user ? this.user.id : undefined;
  }
}
