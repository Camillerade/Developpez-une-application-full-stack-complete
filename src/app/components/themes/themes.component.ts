import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemeService } from 'src/app/services/theme.service';
import { AbonnementService } from 'src/app/services/abonnementService';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  themes: Theme[] = [];
  userId: number | null = null;

  constructor(
    private themeService: ThemeService,
    @Inject(AbonnementService) private abonnementService: AbonnementService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.me().subscribe(
      (user: any) => {
        this.userId = user.id;
        console.log('Utilisateur connecté :', user);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté', error);
      }
    );

    this.themeService.getThemes().subscribe(
      (data: Theme[]) => {
        this.themes = data;
        console.log('Données reçues :', data);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des thèmes', error);
      }
    );
  }

  navigateToThemes() {
    this.router.navigate(['/themes']);
  }

  navigateToCreateArticle() {
    this.router.navigate(['/formarticle']);
  }

  navigateToMe(): void {
    this.router.navigate(['/me']);
  }

  navigateToArticle() {
    this.router.navigate(['/articles']);
  }

  subscribe(theme: Theme): void {
    if (this.userId === null) {
      console.error('Utilisateur non connecté');
      return;
    }

    const themeId = theme.id;
    console.log(`Subscribed to theme: ${theme.title} with user ID: ${this.userId} and theme ID: ${themeId}`);

    this.abonnementService.subscribeToTheme(this.userId, themeId).subscribe(
      (response: any) => {
        console.log('Abonnement réussi:', response);
      },
      (error: any) => {
        console.error('Erreur lors de l\'abonnement:', error);
      }
    );
  }
}
