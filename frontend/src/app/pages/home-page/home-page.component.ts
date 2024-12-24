import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}

// RouterLink es una directiva que permite vincular rutas dentro de la aplicacion, permitiendo que los elementos HTML, como los enlaces <a>, se conviertan en enlaces de navegacion en Angular, haciendo una navegacion interna

// La seccion de import contiene elementos de angular material necesarios para que funciones la aplicacion
