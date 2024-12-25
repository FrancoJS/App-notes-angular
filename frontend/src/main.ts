import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

// bootstrapApplication: funcion que se utiliza para inicializar o arrancar la aplicacion en modo standalone

// appConfig: configuracion global ya definida
