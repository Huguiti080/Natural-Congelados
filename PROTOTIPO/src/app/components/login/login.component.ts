import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials, DemoCredential } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Iniciar Sesión</h2>
        <h3>SIIV NATURAL CONGELADOS</h3>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input 
              type="text" 
              id="usuario" 
              formControlName="usuario" 
              placeholder="Ingrese su usuario"
              [class.error]="isFieldInvalid('usuario')"
            >
            <div class="error-message" *ngIf="isFieldInvalid('usuario')">
              El usuario es requerido
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              placeholder="Ingrese su contraseña"
              [class.error]="isFieldInvalid('password')"
            >
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              La contraseña es requerida
            </div>
          </div>

          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading"
            class="login-button"
          >
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>

        <div class="demo-credentials">
          <h4>Credenciales de Demostración</h4>
          <div class="credential-card" *ngFor="let cred of demoCredentials">
            <div class="credential-header">
              <span class="rol-badge">{{ cred.rol.toUpperCase() }}</span>
            </div>
            <div class="credential-info">
              <p><strong>Usuario:</strong> {{ cred.usuario }}</p>
              <p><strong>Contraseña:</strong> {{ cred.password }}</p>
              <p class="description">{{ cred.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #000000; /* fondo negro */
      padding: 20px;
    }

    .login-card {
      background: #111;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      padding: 40px;
      width: 100%;
      max-width: 500px;
      text-align: center;
      border: 2px solid #ffffff;
    }

    .login-card h2 {
      color: #ffffff;
      margin-bottom: 10px;
      font-size: 28px;
      font-weight: bold;
    }

    .login-card h3 {
      color: #ffffff;
      margin-bottom: 30px;
      font-size: 16px;
      font-weight: normal;
    }

    .login-form {
      text-align: left;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #ffffff;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ffffff;
      border-radius: 6px;
      font-size: 16px;
      background: #222;
      color: #ffffff;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #ffffff;
    }

    .form-group input.error {
      border-color: #e53935;
      color: #e53935;
    }

    .login-button {
      width: 100%;
      padding: 12px;
      background: #ffffff;
      color: #000000;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.2s, color 0.2s;
    }

    .login-button:hover:not(:disabled) {
      background: #e53935;
      color: #ffffff;
    }

    .login-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      color: #e53935;
      font-size: 14px;
      margin-top: 5px;
    }

    .demo-credentials {
      margin-top: 30px;
      text-align: left;
    }

    .demo-credentials h4 {
      color: #ffffff;
      margin-bottom: 15px;
      text-align: center;
      font-size: 18px;
    }

    .credential-card {
      background: #222;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      border-left: 4px solid #ffffff;
    }

    .credential-header {
      margin-bottom: 10px;
    }

    .rol-badge {
      background: #ffffff;
      color: #000000;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .credential-info p {
      margin: 5px 0;
      color: #ffffff;
      font-size: 14px;
    }

    .credential-info .description {
      color: #cccccc;
      font-style: italic;
      font-size: 12px;
      margin-top: 8px;
    }

    .credential-info strong {
      color: #ffffff;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  demoCredentials: DemoCredential[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.demoCredentials = this.authService.getDemoCredentials();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field!.invalid && (field!.dirty || field!.touched);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const credentials: LoginCredentials = this.loginForm.value;
        const result = await this.authService.login(credentials);

        if (result.success) {
          // Mostrar mensaje de bienvenida con el rol
          const rol = result.rol || '';
          this.errorMessage = `Bienvenido ${rol.toUpperCase()}`;
          setTimeout(() => {
            this.router.navigate(['/ventas']);
          }, 1200);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión. Intente nuevamente.';
      } finally {
        this.isLoading = false;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
} 