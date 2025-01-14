import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Theme } from 'app/interfaces/theme.interface';
import { ThemeService } from 'app/services/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})


export class ThemesComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService, private router:Router) {}
 
  ngOnInit(): void {
    this.themeService.getThemes().subscribe(
      (data: Theme[]) => {
        this.themes = data;
        console.log('Données reçues :', data); // Vérifiez les données reçues
      },
      (error) => {
        console.error('Erreur lors de la récupération des thèmes', error);
      }
    );
  }
  navigateToThemes() { 
    this.router.navigate(['/themes']); 
  } 
  
  navigateToAccueil() { 
    this.router.navigate(['/accueil']); 
  } 
  
  navigateToMe() 
  { 
    this.router.navigate(['/me']);
  }
  
  subscribe(theme: Theme): void {
    console.log(`Subscribed to theme: ${theme.title}`);
    // Ajoutez ici la logique pour gérer l'abonnement à un thème
  }
}
