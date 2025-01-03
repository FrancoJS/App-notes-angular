import { MatButton } from '@angular/material/button';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatButton, RouterLink, MatIcon, NgStyle],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isAuthenticated(): boolean {
    const jwtService = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) return false;

    return !jwtService.isTokenExpired(token);
  }
}

// RouterLink es una directiva que permite vincular rutas dentro de la aplicacion, permitiendo que los elementos HTML, como los enlaces <a>, se conviertan en enlaces de navegacion en Angular, haciendo una navegacion interna

// La seccion de import contiene elementos de angular material necesarios para que funciones la aplicacion
