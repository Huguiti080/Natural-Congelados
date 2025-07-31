import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}

  // Obtener todos los empleados
  getEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener empleado por ID
  getEmpleadoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo empleado
  createEmpleado(empleado: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, empleado, { headers });
  }

  // Actualizar empleado existente
  updateEmpleado(id: number, empleado: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, empleado, { headers });
  }

  // Eliminar empleado por ID
  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
