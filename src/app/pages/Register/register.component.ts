import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthSuccess } from 'src/app/interfaces/AuthSuccess';
import { RegisterRequest } from 'src/app/interfaces/RegisterRequest';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public onError = false;

  public form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe(
        (response: AuthSuccess) => {
            localStorage.setItem('token', response.token);
            // Redirection vers le composant de connexion après inscription réussie
            this.router.navigate(['/login']);
        },
        error => this.onError = true
    );
}

}
