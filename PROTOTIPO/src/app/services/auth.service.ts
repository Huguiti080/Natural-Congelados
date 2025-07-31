import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface LoginCredentials {
  usuario: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  rol?: string;
}

export interface DemoCredential {
  usuario: string;
  password: string;
  rol: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(credentials: LoginCredentials): Promise<LoginResult> {
    // Simulación de autenticación con roles
    return new Promise((resolve) => {
      setTimeout(() => {
        // Usuarios de la base de datos
        if (credentials.usuario === 'admin' && credentials.password === 'admin123') {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('rol', 'administrador');
          resolve({ success: true, rol: 'administrador' });
        } else if (credentials.usuario === 'caja1' && credentials.password === '1234') {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('rol', 'vendedor');
          resolve({ success: true, rol: 'vendedor' });
        } else if (credentials.usuario === 'inv' && credentials.password === 'inv123') {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('rol', 'inventario');
          resolve({ success: true, rol: 'inventario' });
        } else if (credentials.usuario === 'super' && credentials.password === 'super123') {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('rol', 'gerente');
          resolve({ success: true, rol: 'gerente' });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  }

  getDemoCredentials(): DemoCredential[] {
    return [
      {
        usuario: 'admin',
        password: 'admin123',
        rol: 'administrador',
        descripcion: 'Acceso completo al sistema'
      },
      {
        usuario: 'caja1',
        password: '1234',
        rol: 'vendedor',
        descripcion: 'Acceso a ventas y clientes'
      },
      {
        usuario: 'inv',
        password: 'inv123',
        rol: 'inventario',
        descripcion: 'Acceso a productos e inventario'
      },
      {
        usuario: 'super',
        password: 'super123',
        rol: 'gerente',
        descripcion: 'Acceso completo como gerente'
      }
    ];
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }
} 