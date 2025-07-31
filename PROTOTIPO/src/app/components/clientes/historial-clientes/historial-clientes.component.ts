
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historial-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Historial de Compras</h2>
    <table>
      <thead>
        <tr>
          <th>ID Venta</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let venta of historial">
          <td>{{ venta.id }}</td>
          <td>{{ venta.fecha }}</td>
          <td>{{ venta.total }}</td>
          <td><button (click)="verDetalle(venta.id)">Ver Detalle</button></td>
        </tr>
      </tbody>
    </table>
  `
})
export class HistorialClientesComponent implements OnInit {
  historial = [
    { id: 1, fecha: '2023-01-15', total: 150.00 }
  ];
  clienteId: number;

  constructor(private route: ActivatedRoute) {
    this.clienteId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // Lógica para obtener historial de compras
  }

  verDetalle(ventaId: number) {
    // Lógica para ver el detalle de la venta
  }
}
