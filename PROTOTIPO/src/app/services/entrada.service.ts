import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EntradaProducto {
  id_entrada: number;
  producto_id: number;
  producto: string;
  cantidad: number;
  fecha_entrada: string;
  proveedor: string;
}

@Injectable({ providedIn: 'root' })
export class EntradaService {
  private baseUrl = 'http://localhost:3000/api/entradas';

  constructor(private http: HttpClient) {}

  registrarEntrada(data: {
    producto_id: number | null;
    cantidad: number | null;
    fecha_entrada: string;
    proveedor: string;
  }) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  obtenerEntradas() {
    return this.http.get<EntradaProducto[]>(`${this.baseUrl}`);
  }
}
