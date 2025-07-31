import { Routes } from '@angular/router';

import { ClientesShellComponent } from './components/clientes-shell/clientes-shell.component';
import { ProductosComponent } from './components/productos/productos.component'; 
import { VentasComponent } from './components/ventas/ventas.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesShellComponent,
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/listar-clientes/listar-clientes.component').then(m => m.ListarClientesComponent)
      },
      {
        path: 'crear',
        loadComponent: () =>
          import('./components/crear-cliente/crear-cliente.component').then(m => m.CrearClienteComponent)
      },
      {
        path: 'buscar',
        loadComponent: () =>
          import('./components/buscar-cliente/buscar-cliente.component').then(m => m.BuscarClienteComponent)
      },
      {
        path: 'actualizar',
        loadComponent: () =>
          import('./components/actualizar-cliente/actualizar-cliente.component').then(m => m.ActualizarClienteComponent)
      },
      {
        path: 'eliminar',
        loadComponent: () =>
          import('./components/eliminar-cliente/eliminar-cliente.component').then(m => m.EliminarClienteComponent)
      },
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
