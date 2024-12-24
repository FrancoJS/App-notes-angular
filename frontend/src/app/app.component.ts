import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

// AppComponent es el componente principal de la aplicacion

// RouterOutlet es un componente marcador de posicion que Angular utiliza para cargar el componente que corresponde a la ruta activa, este indica donde se deben cargar los componentes cuando la ruta cambia

// @Component es un decorador que nos permite indicar que una clase sera un componente y dentro iran los metadatos del componente

// imports es un array que se utiliza para definir los modulos, componentes, directivas y pipes que necesita AppComponent para funcionar correctamente

// templateUrl se utiliza para asociar un archivo HTML al componente.

// styleUrl se utiliza para asociar un archivo CSS al componente

// standalone es una propiedad que se utiliza para indicar que AppComponent no necesita modulos para funcionar
