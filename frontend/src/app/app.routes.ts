import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login.page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { authGuard } from './guards/auth.guard';
import { Component } from '@angular/core';

export const routes: Routes = [
  {
    // Ruta principal.
    path: '',
    component: HomePageComponent,
  },
  {
    // Ruta de registro.
    path: 'auth/register',
    component: RegisterPageComponent,
  },
  {
    // Ruta de login.
    path: 'auth/login',
    component: LoginPageComponent,
  },
  {
    // Ruta de notas.
    path: 'notes',
    loadComponent: () => import('./pages/notes-page/notes-page.component').then((c) => c.NotesPageComponent),
    // Lazy loading, permite cargar los componentes de manera asincrona, mejora el rendimiento
    canActivate: [authGuard],
  },
];

//Routes: Importa el tipo de dato Routes que es un array de objetos de tipo Route, esta define la configuracion de las rutas de la navegacion en la aplicacion. Permite acceder a las opciones de navegacion de la aplicacion.

//  Archivo que define las rutas de la aplicacion, como no hay rutas hijas todas van aca.
