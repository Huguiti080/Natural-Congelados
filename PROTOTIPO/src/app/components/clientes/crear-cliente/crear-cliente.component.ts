
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Crear Cliente</h2>
    <form (ngSubmit)="crearCliente()">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" [(ngModel)]="nuevoCliente.nombre">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" [(ngModel)]="nuevoCliente.email">
      <label for="medio_contacto">Medio de contacto:</label>
      <select id="medio_contacto" name="medio_contacto" [(ngModel)]="nuevoCliente.medio_contacto">
        <option value="tienda">Tienda</option>
        <option value="whatsapp">Whatsapp</option>
        <option value="facebook">Facebook</option>
      </select>
      <button type="submit">Crear Cliente</button>
    </form>
  `
})
export class CrearClienteComponent {
  nuevoCliente = { nombre: '', email: '', medio_contacto: 'tienda' };

  crearCliente() {
    // Lógica para crear cliente
  }
}
