// src/app/services/stock.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ProductoStockCritico {
  id_producto: number;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  proveedor: string;
}

@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerStockCritico() {
    return this.http.get<ProductoStockCritico[]>(`${this.baseUrl}/stock-critico`);
  }
}
