import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container">
      <h2>Crear Cliente</h2>
      <form (ngSubmit)="validarYCrearCliente()" class="cliente-form" #clienteForm="ngForm">
        <div class="form-group">
          <label for="nombre" class="form-label">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            [(ngModel)]="cliente.nombre" 
            name="nombre" 
            required 
            minlength="2"
            maxlength="50"
            class="form-input"
            #nombreInput="ngModel"
            (blur)="validarCampo('nombre', nombreInput)"
          />
          <div class="error-message" *ngIf="nombreInput.invalid && nombreInput.touched">
            <span *ngIf="nombreInput.errors?.['required']">El nombre es requerido</span>
            <span *ngIf="nombreInput.errors?.['minlength']">El nombre debe tener al menos 2 caracteres</span>
            <span *ngIf="nombreInput.errors?.['maxlength']">El nombre no puede exceder 50 caracteres</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="telefono" class="form-label">Teléfono:</label>
          <input 
            type="tel" 
            id="telefono" 
            [(ngModel)]="cliente.telefono" 
            name="telefono" 
            required 
            pattern="[0-9]{10}"
            class="form-input"
            #telefonoInput="ngModel"
            (blur)="validarCampo('telefono', telefonoInput)"
          />
          <div class="error-message" *ngIf="telefonoInput.invalid && telefonoInput.touched">
            <span *ngIf="telefonoInput.errors?.['required']">El teléfono es requerido</span>
            <span *ngIf="telefonoInput.errors?.['pattern']">El teléfono debe tener 10 dígitos</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="direccion" class="form-label">Dirección:</label>
          <input 
            type="text" 
            id="direccion" 
            [(ngModel)]="cliente.direccion" 
            name="direccion" 
            required 
            minlength="5"
            maxlength="100"
            class="form-input"
            #direccionInput="ngModel"
            (blur)="validarCampo('direccion', direccionInput)"
          />
          <div class="error-message" *ngIf="direccionInput.invalid && direccionInput.touched">
            <span *ngIf="direccionInput.errors?.['required']">La dirección es requerida</span>
            <span *ngIf="direccionInput.errors?.['minlength']">La dirección debe tener al menos 5 caracteres</span>
            <span *ngIf="direccionInput.errors?.['maxlength']">La dirección no puede exceder 100 caracteres</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="correo" class="form-label">Correo Electrónico:</label>
          <input 
            type="email" 
            id="correo" 
            [(ngModel)]="cliente.correo" 
            name="correo" 
            required 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            class="form-input"
            #correoInput="ngModel"
            (blur)="validarCampo('correo', correoInput)"
          />
          <div class="error-message" *ngIf="correoInput.invalid && correoInput.touched">
            <span *ngIf="correoInput.errors?.['required']">El correo es requerido</span>
            <span *ngIf="correoInput.errors?.['pattern']">El correo debe tener un formato válido</span>
          </div>
        </div>
        
        <button 
          type="submit" 
          class="submit-button"
          [disabled]="clienteForm.invalid"
        >
          Crear Cliente
        </button>
        
        <button 
          type="button" 
          class="clear-button"
          (click)="limpiarFormulario()"
        >
          Limpiar Formulario
        </button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      margin: 2rem auto;
    }

    h2 {
      color: #388e3c; /* Verde para creación */
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .cliente-form {
      width: 100%;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ffa000; /* Amarillo */
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #388e3c; /* Verde */
        box-shadow: 0 0 0 3px rgba(56, 142, 60, 0.2);
      }

      &.ng-invalid.ng-touched {
        border-color: #d32f2f;
        box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.2);
      }

      &.ng-valid.ng-touched {
        border-color: #388e3c;
      }
    }

    .error-message {
      color: #d32f2f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .submit-button {
      width: 100%;
      background-color: #388e3c; /* Verde */
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;

      &:hover:not(:disabled) {
        background-color: #2e7d32; /* Verde oscuro */
        transform: translateY(-2px);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        transform: none;
      }
    }

    .clear-button {
      width: 100%;
      background-color: #ffa000; /* Amarillo */
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 0.5rem;

      &:hover {
        background-color: #ff8f00; /* Amarillo oscuro */
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class CrearClienteComponent {
  cliente: any = {
    nombre: '',
    telefono: '',
    direccion: '',
    correo: ''
  };

  constructor(private clienteService: ClienteService) {}

  validarCampo(campo: string, input: any): void {
    if (input.invalid && input.touched) {
      let mensaje = '';
      
      switch (campo) {
        case 'nombre':
          mensaje = 'El nombre debe tener entre 2 y 50 caracteres';
          break;
        case 'telefono':
          mensaje = 'El teléfono debe tener 10 dígitos';
          break;
        case 'direccion':
          mensaje = 'La dirección debe tener entre 5 y 100 caracteres';
          break;
        case 'correo':
          mensaje = 'El correo debe tener un formato válido';
          break;
      }

      if (mensaje) {
        Swal.fire({
          icon: 'warning',
          title: 'Campo inválido',
          text: mensaje,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    }
  }

  validarYCrearCliente(): void {
    // Validaciones personalizadas adicionales
    if (!this.validarDatosCompletos()) {
      return;
    }

    // Confirmación antes de crear
    Swal.fire({
      title: '¿Crear cliente?',
      html: `
        <div style="text-align: left; margin: 1rem 0;">
          <p><strong>Nombre:</strong> ${this.cliente.nombre}</p>
          <p><strong>Teléfono:</strong> ${this.cliente.telefono}</p>
          <p><strong>Dirección:</strong> ${this.cliente.direccion}</p>
          <p><strong>Correo:</strong> ${this.cliente.correo}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#388e3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearCliente();
      }
    });
  }

  private validarDatosCompletos(): boolean {
    const errores: string[] = [];

    if (!this.cliente.nombre || this.cliente.nombre.trim().length < 2) {
      errores.push('Nombre válido');
    }
    if (!this.cliente.telefono || !/^[0-9]{10}$/.test(this.cliente.telefono)) {
      errores.push('Teléfono válido (10 dígitos)');
    }
    if (!this.cliente.direccion || this.cliente.direccion.trim().length < 5) {
      errores.push('Dirección válida');
    }
    if (!this.cliente.correo || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.cliente.correo)) {
      errores.push('Correo válido');
    }

    if (errores.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        html: `<p>Por favor complete los siguientes campos:</p><ul style="text-align: left;">${errores.map(e => `<li>${e}</li>`).join('')}</ul>`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ffa000'
      });
      return false;
    }

    return true;
  }

  private crearCliente(): void {
    // Mostrar loading
    Swal.fire({
      title: 'Creando cliente...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Limpiar espacios en blanco
    const clienteLimpio = {
      ...this.cliente,
      nombre: this.cliente.nombre.trim(),
      direccion: this.cliente.direccion.trim(),
      correo: this.cliente.correo.trim()
    };

    this.clienteService.agregarCliente(clienteLimpio).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Cliente creado exitosamente!',
          html: `
            <div style="text-align: left; margin: 1rem 0;">
              <p><strong>${clienteLimpio.nombre}</strong> ha sido agregado como cliente</p>
            </div>
          `,
          confirmButtonText: 'Perfecto',
          confirmButtonColor: '#388e3c',
          timer: 4000,
          timerProgressBar: true
        }).then(() => {
          this.limpiarFormulario();
        });
      },
      error: (err) => {
        console.error('Error al crear cliente:', err);
        
        let errorMessage = 'No se pudo crear el cliente. Por favor, intente nuevamente.';
        
        // Personalizar mensaje según el tipo de error
        if (err.status === 409) {
          errorMessage = `Ya existe un cliente con ese correo electrónico`;
        } else if (err.status === 400) {
          errorMessage = 'Los datos proporcionados no son válidos';
        } else if (err.status === 0) {
          errorMessage = 'Error de conexión. Verifique su conexión a internet.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error al crear cliente',
          text: errorMessage,
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#d32f2f',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#6c757d'
        }).then((result) => {
          if (result.isConfirmed) {
            this.crearCliente(); // Reintentar creación
          }
        });
      },
    });
  }

  limpiarFormulario(): void {
    Swal.fire({
      title: '¿Limpiar formulario?',
      text: 'Se perderán todos los datos ingresados',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffa000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cliente = {
          nombre: '',
          telefono: '',
          direccion: '',
          correo: ''
        };
        
        Swal.fire({
          icon: 'info',
          title: 'Formulario limpiado',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
} 