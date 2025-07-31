import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetalleVenta {
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface Venta {
  cliente_id: number;
  total: number;
  detalles: DetalleVenta[];
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:3000/api/ventas';

  constructor(private http: HttpClient) { }

  registrarVenta(venta: Venta): Observable<any> {
    return this.http.post(this.apiUrl, venta);
  }

  getVentasDiarias(fecha: string) {
    return this.http.get<any>('http://localhost:3000/api/reportes/ventas-diarias', {
      params: { fecha }
    });
  }

  // venta.service.ts
  obtenerReportePorProducto(fechaInicio: string, fechaFin: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/reportes/ventas-producto`, {
      params: { fechaInicio, fechaFin }
    });
  }

  descargarPdf(ventaId: number): Observable<Blob> {
    return this.http.get(`/api/ventas/${ventaId}/nota/pdf`, { responseType: 'blob' });
  }

  descargarExcel(ventaId: number): Observable<Blob> {
    return this.http.get(`/api/ventas/${ventaId}/nota/excel`, { responseType: 'blob' });
  }
}
