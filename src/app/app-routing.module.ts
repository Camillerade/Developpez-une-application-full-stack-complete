import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/Login/login.component';
import { RegisterComponent } from './pages/Register/register.component';
import { MeComponent } from './components/me/me.component';
import { ThemesComponent } from './components/themes/themes.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { CreateArticleComponent } from './components/formarticle/formarticle.component';
import { ArticleDetailComponent } from './components/articleDetail/articledetail.component';
import { AuthService } from './services/auth.service'; // Assurez-vous que le AuthService est importé
import { UnauthGuard } from './guards/unauth.guard'; // Assurez-vous que le UnauthGuard est importé
import { AuthGuard } from './guards/auth.guard'; // Assurez-vous que le AuthGuard est importé

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UnauthGuard], pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [UnauthGuard], title: 'Home' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnauthGuard] },
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'themes', component: ThemesComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'formarticle', component: CreateArticleComponent, canActivate: [AuthGuard] },
  { path: 'articles/:id', component: ArticleDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
