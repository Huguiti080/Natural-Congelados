import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent {
  id!: number;
  cliente: any = null;

  constructor(private clienteService: ClienteService) {}

  buscarCliente(): void {
    // Since ClienteService doesn't have getClienteById, we'll need to get all clients and filter
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.cliente = data.find((c: any) => c.id_cliente === this.id);
        if (this.cliente) {
          Swal.fire({
            icon: 'success',
            title: 'Cliente encontrado',
            text: `Cliente: ${this.cliente.nombre}`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Cliente no encontrado',
          });
        }
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo buscar el cliente',
        });
      },
    });
  }

  actualizarCliente(): void {
    // Since ClienteService doesn't have updateCliente, we'll need to implement it
    // For now, we'll show a message that this functionality needs to be implemented
    Swal.fire({
      icon: 'info',
      title: 'Función en desarrollo',
      text: 'La actualización de clientes está en desarrollo. Por favor, use la función de eliminar y crear un nuevo cliente.',
    });
  }
} 