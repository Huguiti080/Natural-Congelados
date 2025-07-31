import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container">
      <h2>Lista de Clientes</h2>
      <div class="table-container" *ngIf="clientes.length > 0; else noClientes">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cliente of clientes">
              <td>{{ cliente.id_cliente }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>{{ cliente.direccion }}</td>
              <td>{{ cliente.correo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <ng-template #noClientes>
        <div class="empty-state">
          <p>No hay clientes registrados</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      background-color: #000;
      min-height: 100vh;
    }

    h2 {
      color: #ffcc00;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
    }

    .table-container {
      overflow-x: auto;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(255, 51, 51, 0.3);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #1a1a1a;
      color: #fff;
    }

    th {
      background-color: #000;
      color: #ffcc00;
      padding: 1.2rem;
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 2px solid #ff3333;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #333;
    }

    tr:nth-child(even) {
      background-color: rgba(51, 204, 51, 0.05);
    }

    tr:hover {
      background-color: rgba(255, 51, 51, 0.1);
      transform: scale(1.01);
      transition: all 0.2s ease;
    }

    /* Estilo para la columna de correo */
    td:nth-child(5) {
      color: #33cc33;
      font-weight: bold;
    }

    /* Estilo para la columna de teléfono */
    td:nth-child(3) {
      text-align: center;
    }

    /* Efecto de borde en hover para filas */
    tr {
      position: relative;
    }

    tr:hover::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: linear-gradient(90deg, #ff3333, #ffcc00, #33cc33);
    }

    .empty-state {
      text-align: center;
      color: #ffcc00;
      font-size: 1.2rem;
      margin-top: 3rem;
    }
  `],
})
export class ListarClientesComponent implements OnInit {
  clientes: any[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  private cargarClientes(): void {
    // Mostrar loading
    Swal.fire({
      title: 'Cargando clientes...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        Swal.close();
        
        // Mostrar mensaje de éxito si hay clientes
        if (this.clientes.length > 0) {
          Swal.fire({
            icon: 'success',
            title: '¡Clientes cargados!',
            text: `Se encontraron ${this.clientes.length} cliente(s)`,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
          });
        } else {
          // Mostrar info si no hay clientes
          Swal.fire({
            icon: 'info',
            title: 'Sin clientes',
            text: 'No se encontraron clientes registrados',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ffcc00'
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar clientes',
          text: 'No se pudieron cargar los clientes. Por favor, intente nuevamente.',
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#ff3333',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#666'
        }).then((result) => {
          if (result.isConfirmed) {
            this.cargarClientes(); // Reintentar carga
          }
        });
      },
    });
  }
} 