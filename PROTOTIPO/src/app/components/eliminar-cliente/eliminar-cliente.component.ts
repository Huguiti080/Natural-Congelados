import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-cliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container">
      <h2>Eliminar Cliente</h2>
      <div class="form-group">
        <input 
          type="number" 
          [(ngModel)]="id" 
          placeholder="ID del cliente"
          class="form-input"
          min="1"
          (keypress)="onKeyPress($event)"
        />
      </div>
      <button 
        class="delete-button" 
        (click)="confirmarEliminacion()"
        [disabled]="!id || id <= 0"
      >
        Eliminar Cliente
      </button>
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
      color: #d32f2f; /* Rojo */
      margin-bottom: 1.5rem;
    }

    .form-group {
      width: 100%;
      margin-bottom: 1.5rem;
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

      &:invalid {
        border-color: #d32f2f;
      }
    }

    .delete-button {
      background-color: #d32f2f; /* Rojo */
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background-color: #b71c1c; /* Rojo oscuro */
        transform: translateY(-2px);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
      }
    }

    /* Mensajes de feedback podrían usar estos colores */
    .success {
      color: #388e3c; /* Verde */
    }

    .warning {
      color: #ffa000; /* Amarillo */
    }

    .error {
      color: #d32f2f; /* Rojo */
    }
  `],
})
export class EliminarClienteComponent {
  id!: number;

  constructor(private clienteService: ClienteService) {}

  onKeyPress(event: KeyboardEvent): void {
    // Permitir solo números y teclas de control
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
    
    // Si presiona Enter, confirmar eliminación
    if (event.key === 'Enter' && this.id && this.id > 0) {
      this.confirmarEliminacion();
    }
  }

  confirmarEliminacion(): void {
    // Validar que hay un ID válido
    if (!this.id || this.id <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'ID requerido',
        text: 'Por favor, ingrese un ID válido del cliente',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ffa000'
      });
      return;
    }

    // Confirmación de eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al cliente con ID ${this.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarCliente();
      }
    });
  }

  private eliminarCliente(): void {
    // Mostrar loading
    Swal.fire({
      title: 'Eliminando cliente...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.clienteService.eliminarCliente(this.id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Cliente eliminado!',
          text: `El cliente con ID ${this.id} ha sido eliminado correctamente`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#388e3c',
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          // Limpiar el formulario después de eliminar
          this.id = null as any;
        });
      },
      error: (err) => {
        console.error('Error al eliminar cliente:', err);
        
        let errorMessage = 'No se pudo eliminar el cliente. Por favor, intente nuevamente.';
        
        // Personalizar mensaje según el tipo de error
        if (err.status === 404) {
          errorMessage = `No se encontró un cliente con ID ${this.id}`;
        } else if (err.status === 403) {
          errorMessage = 'No tienes permisos para eliminar este cliente';
        } else if (err.status === 0) {
          errorMessage = 'Error de conexión. Verifique su conexión a internet.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: errorMessage,
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#d32f2f',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#6c757d'
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarCliente(); // Reintentar eliminación
          }
        });
      },
    });
  }
} 