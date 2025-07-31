import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id_cliente?: number;
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;


}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/api/clientes';
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  agregarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getReportePorCliente(id: number): Observable<{ cliente: string; total_ventas: number; total_ingresos: number }> {
  return this.http.get<{ cliente: string; total_ventas: number; total_ingresos: number }>(
    `http://localhost:3000/api/reportes/ventas-cliente/${id}`
  );
}


}
