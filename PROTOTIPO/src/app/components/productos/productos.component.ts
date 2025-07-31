import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService, Producto } from '../../services/producto.service';
import { StockService, ProductoStockCritico } from '../../services/stock.service';
import { EntradaService, EntradaProducto } from '../../services/entrada.service';
import { ViewEncapsulation } from '@angular/core';
import { Pedido, PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  pedidos: Pedido[] = [];

  nuevo: Producto = { nombre: '', categoria: '', precio: 0, stock: 0, proveedor: '' };
  productosCriticos: ProductoStockCritico[] = [];
  entrada = {
    producto_id: null,
    cantidad: null,
    fecha_entrada: '',
    proveedor: ''
  };

  historialEntradas: EntradaProducto[] = [];
  mensajeExito: string = '';

  pedidoForm: FormGroup;
  mostrarFormularioPedido = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService, 
    private stockService: StockService, 
    private entradaService: EntradaService, 
    private pedidosService: PedidosService
  ) {
    // Nuevo formulario de pedidos
    this.pedidoForm = this.fb.group({
      producto_id: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      estado: ['pendiente', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.cargarStockCritico();
    this.cargarHistorialEntradas();
    this.cargarPedidos();
    this.entrada.fecha_entrada = new Date().toISOString().split('T')[0]; // fecha actual
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  agregar() {
    this.productoService.agregarProducto(this.nuevo).subscribe(() => {
      this.obtenerProductos();
      this.nuevo = { nombre: '', categoria: '', precio: 0, stock: 0, proveedor: '' };
    });
  }

  cargarStockCritico(): void {
    this.stockService.obtenerStockCritico().subscribe(data => {
      this.productosCriticos = data;
    });
  }

  registrarEntrada() {
    if (!this.entrada.producto_id || !this.entrada.cantidad) return;

    this.entradaService.registrarEntrada(this.entrada).subscribe(() => {
      this.mensajeExito = '✅ Entrada registrada correctamente.';
      this.entrada.cantidad = null;
      this.entrada.proveedor = '';
      this.cargarHistorialEntradas();
    });
  }

  cargarHistorialEntradas() {
    this.entradaService.obtenerEntradas().subscribe(data => {
      this.historialEntradas = data;
    });
  }

  // Nuevos métodos para pedidos
  cargarPedidos() {
    this.pedidosService.obtenerPedidos().subscribe({
      next: (data) => this.pedidos = data,
      error: (error) => console.error('Error al cargar pedidos:', error)
    });
  }

  crearPedido() {
    if (this.pedidoForm.valid) {
      const nuevoPedido: Pedido = {
        ...this.pedidoForm.value,
        fecha: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
      };

      this.pedidosService.crearPedido(nuevoPedido).subscribe({
        next: () => {
          this.cargarPedidos();
          this.pedidoForm.reset();
          this.pedidoForm.patchValue({ estado: 'pendiente' });
          this.mostrarFormularioPedido = false;
        },
        error: (error) => console.error('Error al crear pedido:', error)
      });
    }
  }

  actualizarEstadoPedido(id: number, nuevoEstado: string) {
    this.pedidosService.actualizarPedido(id, { estado: nuevoEstado }).subscribe({
      next: () => this.cargarPedidos(),
      error: (error) => console.error('Error al actualizar pedido:', error)
    });
  }

  obtenerNombreProducto(id: number): string {
    const producto = this.productos.find(p => p.id_producto === id);
    return producto ? producto.nombre : 'Producto no encontrado';
  }

  toggleFormularioPedido() {
    this.mostrarFormularioPedido = !this.mostrarFormularioPedido;
  }
}