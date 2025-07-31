import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <ul>
        <li *ngIf="rol === 'administrador' || rol === 'gerente'"><a routerLink="/clientes" routerLinkActive="active">Clientes</a></li>
        <li *ngIf="rol === 'administrador' || rol === 'inventario' || rol === 'gerente'"><a routerLink="/productos" routerLinkActive="active">Productos</a></li>
        <li><a routerLink="/ventas">Ventas</a></li>
        <li><button (click)="logout()" class="logout-btn">Cerrar Sesión</button></li>
        <li *ngIf="rol" class="rol-label">Rol: {{ rol.toUpperCase() }}</li>
      </ul>
    </nav>
  `,
  styles: [
    `
      nav ul {
        list-style: none;
        padding: 0;
        display: flex;
        gap: 1rem;
        justify-content: center; 
      }
      nav ul li {
        display: inline-block;
      }
      nav ul li a {
        text-decoration: none;
        font-weight: bold;
        color:rgb(255, 30, 0);
      }
      nav ul li a:hover {
        color:rgb(255, 204, 0);
      }
      .logout-btn {
        background: none;
        border: none;
        color: rgb(255, 30, 0);
        font-weight: bold;
        cursor: pointer;
        padding: 0;
        font-size: inherit;
      }
      .logout-btn:hover {
        color: rgb(255, 204, 0);
      }
      .rol-label {
        color: #ffe600;
        font-weight: bold;
        margin-left: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    `,
  ],
})
export class MenuComponent implements OnInit {
  rol: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.rol = localStorage.getItem('rol') || '';
  }

  logout() {
    this.authService.logout();
  }
}
