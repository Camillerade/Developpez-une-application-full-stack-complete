import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/Login/login.component';
import { RegisterComponent } from './pages/Register/register.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { MeComponent } from './components/me/me.component';
import { ThemesComponent } from './components/themes/themes.component';
import { CreateArticleComponent } from './components/formarticle/formarticle.component';
import { ArticleDetailComponent } from './components/articleDetail/articledetail.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me', component: MeComponent },
  { path: 'themes', component: ThemesComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'formarticle', component: CreateArticleComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
