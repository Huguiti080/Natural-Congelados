import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="container">
      <h2>Buscar Cliente</h2>
      
      <div class="search-container">
        <input 
          type="number" 
          [(ngModel)]="id" 
          placeholder="ID del cliente"
          class="search-input"
          min="1"
          (keypress)="onKeyPress($event)"
          #searchInput
        />
        <button 
          (click)="validarYBuscarCliente()" 
          class="search-button"
          [disabled]="!id || id <= 0"
        >
          Buscar
        </button>
        <button 
          (click)="limpiarBusqueda()" 
          class="clear-button"
          *ngIf="cliente || clienteNoEncontrado"
        >
          Limpiar
        </button>
      </div>

      <div *ngIf="cliente" class="client-details" [@slideIn]>
        <div class="client-header">
          <h3>Información del Cliente</h3>
          <button class="export-button" (click)="exportarCliente()">
            <i class="icon-download"></i> Exportar
          </button>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">ID:</span>
          <span class="detail-value">{{ cliente.id_cliente }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Nombre:</span>
          <span class="detail-value">{{ cliente.nombre }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Teléfono:</span>
          <span class="detail-value">{{ cliente.telefono }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Dirección:</span>
          <span class="detail-value">{{ cliente.direccion }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Correo:</span>
          <span class="detail-value email">{{ cliente.correo }}</span>
        </div>
      </div>

      <div *ngIf="clienteNoEncontrado" class="not-found" [@slideIn]>
        <div class="not-found-icon">🔍</div>
        <h4>No se encontró ningún cliente</h4>
        <p>No existe un cliente con ID: <strong>{{ ultimaIdBuscada }}</strong></p>
        <button class="retry-button" (click)="searchInput.focus()">Buscar otro ID</button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #1976d2;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .search-container {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .search-input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #1976d2;
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #ffa000;
      box-shadow: 0 0 0 3px rgba(255, 160, 0, 0.2);
    }

    .search-input:invalid {
      border-color: #d32f2f;
    }

    .search-button {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 0 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .search-button:hover:not(:disabled) {
      background-color: #1565c0;
      transform: translateY(-2px);
    }

    .search-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .search-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      transform: none;
    }

    .clear-button {
      background-color: #ffa000;
      color: white;
      border: none;
      padding: 0 1rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .clear-button:hover {
      background-color: #ff8f00;
      transform: translateY(-2px);
    }

    .client-details {
      background-color: white;
      padding: 1.5rem;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    }

    .client-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .client-details h3 {
      color: #388e3c;
      margin: 0;
    }

    .export-button {
      background-color: #388e3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .export-button:hover {
      background-color: #2e7d32;
      transform: translateY(-1px);
    }

    .detail-row {
      display: flex;
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #eee;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      font-weight: 600;
      color: #555;
      width: 120px;
    }

    .detail-value {
      flex: 1;
      color: #333;
    }

    .detail-value.email {
      color: #388e3c;
      font-weight: 600;
    }

    .not-found {
      text-align: center;
      color: #d32f2f;
      padding: 2rem 1rem;
      background-color: #ffebee;
      border-radius: 8px;
      margin-top: 1rem;
      animation: slideIn 0.3s ease-out;
    }

    .not-found-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .not-found h4 {
      margin: 0 0 0.5rem 0;
      color: #d32f2f;
    }

    .not-found p {
      margin: 0 0 1rem 0;
      color: #666;
    }

    .retry-button {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .retry-button:hover {
      background-color: #1565c0;
      transform: translateY(-1px);
    }
  `],
  animations: []
})
export class BuscarClienteComponent {
  id!: number;
  cliente: any = null;
  clienteNoEncontrado: boolean = false;
  ultimaIdBuscada: number | null = null;

  constructor(private clienteService: ClienteService) {}

  onKeyPress(event: KeyboardEvent): void {
    // Permitir solo números y teclas de control
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
    
    // Si presiona Enter, buscar cliente
    if (event.key === 'Enter' && this.id && this.id > 0) {
      this.validarYBuscarCliente();
    }
  }

  validarYBuscarCliente(): void {
    // Validar que hay un ID válido
    if (!this.id || this.id <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'ID requerido',
        text: 'Por favor, ingrese un ID válido del cliente',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#1976d2',
        focusConfirm: true
      });
      return;
    }

    this.buscarCliente();
  }

  private buscarCliente(): void {
    // Limpiar resultados anteriores
    this.cliente = null;
    this.clienteNoEncontrado = false;
    this.ultimaIdBuscada = this.id;

    // Mostrar loading
    Swal.fire({
      title: 'Buscando cliente...',
      text: `Buscando cliente con ID ${this.id}`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Since ClienteService doesn't have getClienteById, we'll need to get all clients and filter
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.cliente = data.find((c: any) => c.id_cliente === this.id);
        Swal.close();
        
        if (this.cliente) {
          // Mostrar toast de éxito
          Swal.fire({
            icon: 'success',
            title: 'Cliente encontrado',
            text: `${this.cliente.nombre} - ${this.cliente.correo}`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        } else {
          this.clienteNoEncontrado = true;
          Swal.fire({
            icon: 'error',
            title: 'Cliente no encontrado',
            text: `No se encontró ningún cliente con ID ${this.id}`,
            confirmButtonText: 'Buscar otro',
            confirmButtonColor: '#1976d2',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6c757d'
          }).then((result) => {
            if (result.isConfirmed) {
              this.id = null as any;
              // Enfocar el input para nueva búsqueda
              setTimeout(() => {
                const input = document.querySelector('.search-input') as HTMLInputElement;
                if (input) input.focus();
              }, 100);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al buscar cliente:', err);
        this.clienteNoEncontrado = true;
        Swal.close();
        
        let errorTitle = 'Error de conexión';
        let errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
        
        // Personalizar mensaje según el tipo de error
        if (err.status === 400) {
          errorTitle = 'ID inválido';
          errorMessage = 'El ID proporcionado no es válido';
        } else if (err.status >= 500) {
          errorTitle = 'Error del servidor';
          errorMessage = 'Hubo un problema en el servidor. Por favor, intente más tarde.';
        }

        Swal.fire({
          icon: 'error',
          title: errorTitle,
          text: errorMessage,
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#1976d2',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#6c757d'
        }).then((result) => {
          if (result.isConfirmed) {
            this.buscarCliente(); // Reintentar búsqueda
          }
        });
      }
    });
  }

  limpiarBusqueda(): void {
    Swal.fire({
      title: '¿Limpiar búsqueda?',
      text: 'Se limpiará la información mostrada',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffa000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cliente = null;
        this.clienteNoEncontrado = false;
        this.id = null as any;
        this.ultimaIdBuscada = null;
        
        Swal.fire({
          icon: 'info',
          title: 'Búsqueda limpiada',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });

        // Enfocar el input
        setTimeout(() => {
          const input = document.querySelector('.search-input') as HTMLInputElement;
          if (input) input.focus();
        }, 100);
      }
    });
  }

  exportarCliente(): void {
    if (!this.cliente) return;

    Swal.fire({
      title: '¿Exportar información?',
      text: `¿Desea exportar la información de ${this.cliente.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#388e3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, exportar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.descargarInformacionCliente();
      }
    });
  }

  private descargarInformacionCliente(): void {
    const clienteInfo = `
INFORMACIÓN DEL CLIENTE
=======================

ID: ${this.cliente.id_cliente}
Nombre: ${this.cliente.nombre}
Teléfono: ${this.cliente.telefono}
Dirección: ${this.cliente.direccion}
Correo: ${this.cliente.correo}

Fecha de exportación: ${new Date().toLocaleDateString('es-ES')}
    `;

    const blob = new Blob([clienteInfo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cliente_${this.cliente.id_cliente}_${this.cliente.nombre.replace(/\s+/g, '_')}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'Información exportada',
      text: 'El archivo se ha descargado correctamente',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
} 