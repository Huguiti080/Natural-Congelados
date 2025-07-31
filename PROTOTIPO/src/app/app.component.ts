import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuComponent, CommonModule],
  template: `
    <div *ngIf="authService.isLoggedIn()">
      <h1>SIIV NATURAL CONGELADOS</h1>
      <app-menu></app-menu>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Verificar si el usuario está autenticado al cargar la aplicación
    if (!this.authService.isLoggedIn()) {
      // Si no está autenticado, redirigir al login
      // Esto se maneja automáticamente por la ruta por defecto
    }
  }
}