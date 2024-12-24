import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};

// appConfig es una constante que define la configuracion global de la aplicacion

// AplicationConfig es un interface que nos define la configuracion global de la aplicacion, como proveedores (services), modulos de animacion, enrutamiento, etc

// Proveedores que estaran disponibles en toda la aplicacion:

// provideZoneChangeDetection es un proveedor que nos permite configurar la deteccion de cambios en el DOM de manera asincrona, agrupa los eventos en un solo ciclo de deteccion con { eventCoalescing:true } que mejora el rendimiento

// provideRouter es un proveedor que nos permite configurar el enrutamiento de la aplicacion utilizando el array de rutas definidas en routes

// provideAnimationsAsync es una funcion que nos permite cargar los modulos de animacion de manera asincrona, mejora el rendimiento de la aplicacion al cargar las animacines solo cuando son necesarias aplicando lazy loading

// provideHttpClient es un proveedor que nos permite configurar las peticiones HTTP a APIS externas o un servidor backend
