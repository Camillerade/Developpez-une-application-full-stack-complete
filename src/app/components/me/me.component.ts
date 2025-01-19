import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbonnementService } from 'src/app/services/abonnementService';
import { User } from 'src/app/interfaces/user.interface';
import { Abonnement } from 'src/app/interfaces/Abonnement';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  public user: User | undefined;
  public abonnements: Abonnement[] = [];
  isLogged = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private abonnementService: AbonnementService,
    private matSnackBar: MatSnackBar,
    private sessionService:SessionService
  ) { this.isLogged = this.sessionService.isLogged}

  public ngOnInit(): void {
    this.loadUserInfo();
  }

 
  navigateToMe(): void { this.router.navigate(['/me']); }
  private loadUserInfo(): void {
    this.authService.me().subscribe(
      (user: any) => {
        this.user = {
          id: user.id,
          email: user.email,
          username: user.username,
          admin: user.admin,
          createdAt: user.createdAt,
          updatedAt: new Date(user.updatedAt)
        };

        this.loadUserAbonnements(this.user.id); // Charger les abonnements de l'utilisateur
      },
      error => {
        this.matSnackBar.open('Failed to load user info', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  private loadUserAbonnements(userId: number): void {
    this.abonnementService.getUserAbonements(userId).subscribe(
      (abonnements: Abonnement[]) => {
        console.log('Abonnements reçus :', abonnements); // Ajouter ce log pour vérifier les données reçues
        this.abonnements = abonnements;
      },
      () => {
        this.matSnackBar.open('Failed to load abonnements', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  
 
  
  public unsubscribe(themeId: number): void {
    if (this.user) {
      this.abonnementService.unsubscribeFromTheme(this.user.id, themeId).subscribe(
        () => {
          this.matSnackBar.open('Successfully unsubscribed', 'Close', {
            duration: 3000,
          });

          // Mettre à jour la liste des abonnements après désabonnement
          this.abonnements = this.abonnements.filter(abonnement => abonnement.theme.id !== themeId);
        },
        () => {
          this.matSnackBar.open('Failed to unsubscribe', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  navigateToThemes(): void {
    this.router.navigate(['/themes']);
  }

  navigateToArticle(): void {
    this.router.navigate(['/articles']);
  }


  public save(): void {
    if (this.user) {
      const updatedUser: User = {
        id: this.user.id,
        email: this.user!.email,
        username: this.user!.username,
        admin: this.user.admin,
        password: this.user.password, // Ajouter le nouveau mot de passe
        createdAt: this.user.createdAt,
        updatedAt: new Date()
      };

      this.authService.updateUser(updatedUser).subscribe(
        () => {
          this.matSnackBar.open('User updated successfully', 'Close', {
            duration: 3000,
          });
        },
        error => {
          this.matSnackBar.open('Failed to update user', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  public delete(): void {
    if (this.user) {
      this.authService.deleteUser(this.user.id.toString()).subscribe(
        () => {
          this.matSnackBar.open('User deleted successfully', 'Close', {
            duration: 3000,
          });
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        },
        error => {
          this.matSnackBar.open('Failed to delete user', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
  logout(): void {
    this.sessionService.logOut(); // Appelle la méthode logOut du SessionService
    this.router.navigate(['/login']); // Redirige vers la page de connexion après déconnexion
  }
  
  
  public changePassword(): void {
    if (this.user) {
      const updatedUser: User = {
        id: this.user.id,
        email: this.user.email,
        username: this.user.username,
        admin: this.user.admin,
        password: this.user.password, // Ajouter le nouveau mot de passe
        createdAt: this.user.createdAt,
        updatedAt: new Date()
      };

      this.authService.updateUser(updatedUser).subscribe(
        () => {
          this.matSnackBar.open('Password updated successfully', 'Close', {
            duration: 3000,
          });
        },
        error => {
          this.matSnackBar.open('Failed to update password', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
