import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { Producto, ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  carrito: { producto: Producto; cantidad: number }[] = [];

  clienteSeleccionado: number | null = null;
  reporteCliente: { cliente: string; total_ventas: number; total_ingresos: number } | null = null;

  fechaInicioProducto: string = '';
  fechaFinProducto: string = '';
  reporteProductos: any[] = [];

  fechaReporte: string = '';
  reporte: { total_ventas: number; total_ingresos: number } | null = null;
  ultimaVentaId: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private ventaService: VentaService,

  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(c => this.clientes = c);
    this.productoService.getProductos().subscribe(p => this.productos = p);
    this.obtenerClientes();

  }

  agregarProducto(p: Producto) {
    const item = this.carrito.find(i => i.producto.id_producto === p.id_producto);
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({ producto: p, cantidad: 1 });
    }
  }

  quitarProducto(p: Producto) {
    const item = this.carrito.find(i => i.producto.id_producto === p.id_producto);
    if (item) {
      item.cantidad--;
      if (item.cantidad <= 0) {
        this.carrito = this.carrito.filter(i => i.producto.id_producto !== p.id_producto);
      }
    }
  }

  get total(): number {
    return this.carrito.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);
  }

  registrarVenta() {
    if (!this.clienteSeleccionado || this.carrito.length === 0) {
      alert('Selecciona un cliente y al menos un producto');
      return;
    }

    const venta = {
      cliente_id: this.clienteSeleccionado,
      total: this.total,
      detalles: this.carrito.map(i => ({
        producto_id: i.producto.id_producto!,
        cantidad: i.cantidad,
        precio_unitario: i.producto.precio,
        subtotal: i.producto.precio * i.cantidad
      }))
    };

    this.ventaService.registrarVenta(venta).subscribe((res: any) => {
      alert('Venta registrada exitosamente');
      console.log('>> respuesta crearVenta:', res);

      this.ultimaVentaId = res.id_venta;
      this.carrito = [];
      this.clienteSeleccionado = null;
    });
  }

  onDescargarPdf() {
    if (!this.ultimaVentaId) {
      alert('No hay una venta registrada para descargar');
      return;
    }

    this.ventaService.descargarPdf(this.ultimaVentaId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nota_${this.ultimaVentaId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  onDescargarExcel() {
    if (!this.ultimaVentaId) {
      alert('No hay una venta registrada para descargar');
      return;
    }

    this.ventaService.descargarExcel(this.ultimaVentaId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nota_${this.ultimaVentaId}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  obtenerCantidad(productoId: number): number {
    const item = this.carrito.find(i => i.producto.id_producto === productoId);
    return item ? item.cantidad : 0;
  }

  cargarReporte() {
    if (!this.fechaReporte) return;

    const fechaFormateada = new Date(this.fechaReporte).toISOString().split('T')[0];

    this.ventaService.getVentasDiarias(fechaFormateada).subscribe(data => {
      this.reporte = data;
    });
  }

  obtenerClientes() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  cargarReporteCliente() {
    if (!this.clienteSeleccionado) return;
    this.clienteService.getReportePorCliente(this.clienteSeleccionado).subscribe(data => {
      this.reporteCliente = data;
    });
  }

  cargarReportePorProducto() {
  this.ventaService
    .obtenerReportePorProducto(this.fechaInicioProducto, this.fechaFinProducto)
    .subscribe(data => {
      this.reporteProductos = data;
    });
}
}
