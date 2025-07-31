// services/pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id_pedido?: number;
  producto_id: number;
  fecha: string;
  cantidad: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  // Crear nuevo pedido
  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  // Obtener todos los pedidos
  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // Actualizar pedido
  actualizarPedido(id: number, pedido: Partial<Pedido>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pedido);
  }
}