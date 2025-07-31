
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Realizar Pedido</h2>
    <form (ngSubmit)="generarPedido()">
      <label for="producto">Producto:</label>
      <select id="producto" name="producto" [(ngModel)]="nuevoPedido.producto_id">
        <option value="1">Producto 1</option>
        <option value="2">Producto 2</option>
      </select>
      <label for="cantidad">Cantidad:</label>
      <input type="number" id="cantidad" name="cantidad" [(ngModel)]="nuevoPedido.cantidad">
      <button type="submit">Generar pedido</button>
    </form>

    <h2>Pedidos Recientes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let pedido of pedidos">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.producto }}</td>
          <td>{{ pedido.cantidad }}</td>
          <td>{{ pedido.estado }}</td>
          <td><button (click)="actualizarEstado(pedido.id, 'enviado')">Marcar como Enviado</button></td>
        </tr>
      </tbody>
    </table>
  `
})
export class PedidosComponent {
  nuevoPedido = { producto_id: 1, cantidad: 1 };
  pedidos = [
    { id: 1, producto: 'Producto 1', cantidad: 2, estado: 'pendiente' }
  ];

  generarPedido() {
    // Lógica para generar pedido
  }

  actualizarEstado(id: number, estado: string) {
    // Lógica para actualizar estado
  }
}
