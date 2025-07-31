import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reporte-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './reporte-cliente.component.html',
})
export class ReporteClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSeleccionado!: number;
  ventas: any[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  cargarReporte() {
    this.clienteService.getReportePorCliente(this.clienteSeleccionado).subscribe(data => {
      this.ventas = data;
    });
  }
}
