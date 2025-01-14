import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/interfaces/theme.interface';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService, private router: Router) {}

  navigateToThemes(): void {
    this.router.navigate(['/themes']);
  }
  navigateToAccueil() {
    this.router.navigate(['/accueil']);
  }
  ngOnInit(): void {
    this.themeService.getThemes().subscribe(
      (data: Theme[]) => {
        this.themes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des thèmes', error);
      }
    );
  }
}
