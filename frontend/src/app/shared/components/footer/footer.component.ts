import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `<footer>
    <div class="container">
      <p class="text-center">© Copyright 2024. Creado por Franco_SJ</p>
    </div>
  </footer>`,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
