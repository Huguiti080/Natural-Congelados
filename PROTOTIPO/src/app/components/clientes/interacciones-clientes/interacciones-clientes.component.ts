
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interacciones-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Registrar Interacción</h2>
    <form (ngSubmit)="registrarInteraccion()">
      <label for="tipo">Tipo:</label>
      <input type="text" id="tipo" name="tipo" [(ngModel)]="nuevaInteraccion.tipo">
      <label for="medio">Medio:</label>
      <input type="text" id="medio" name="medio" [(ngModel)]="nuevaInteraccion.medio">
      <label for="descripcion">Descripción:</label>
      <textarea id="descripcion" name="descripcion" [(ngModel)]="nuevaInteraccion.descripcion"></textarea>
      <button type="submit">Registrar</button>
    </form>

    <h2>Interacciones Recientes</h2>
    <ul>
      <li *ngFor="let interaccion of interacciones">
        {{ interaccion.fecha }} - {{ interaccion.tipo }} ({{ interaccion.medio }}): {{ interaccion.descripcion }}
      </li>
    </ul>
  `
})
export class InteraccionesClientesComponent implements OnInit {
  nuevaInteraccion = { tipo: '', medio: '', descripcion: '' };
  interacciones = [
    { fecha: '2023-03-01', tipo: 'Llamada', medio: 'Telefónico', descripcion: 'Consulta sobre producto X' }
  ];
  clienteId: number;

  constructor(private route: ActivatedRoute) {
    this.clienteId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // Lógica para obtener interacciones
  }

  registrarInteraccion() {
    // Lógica para registrar interacción
  }
}
