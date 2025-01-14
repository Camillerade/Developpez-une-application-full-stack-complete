import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from 'src/app/interfaces/LoginRequest';
import { AuthSuccess } from 'src/app/interfaces/AuthSuccess';
import { User } from 'src/app/interfaces/user.interface';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public hide = true;
  public onError = false;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private router: Router
  ) { }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe(
        (response: AuthSuccess) => {
            localStorage.setItem('token', response.token);
            // Redirection vers le composant accueil après une connexion réussie
            this.authService.me().subscribe((user: User) => {
                this.router.navigate(['/articles']);
            });
        },
        error => this.onError = true
    );
}

}
