import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login.page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'auth/register',
    component: RegisterPageComponent,
  },
  {
    path: 'auth/login',
    component: LoginPageComponent,
  },
  {
    path: 'api/notes',
    component: NotesPageComponent,
    canActivate: [authGuard],
  },
];
