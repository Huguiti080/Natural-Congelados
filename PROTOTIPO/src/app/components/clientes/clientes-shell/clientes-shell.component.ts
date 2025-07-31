import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes-shell',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink],
  templateUrl: './clientes-shell.component.html',
  styleUrls: ['./clientes-shell.component.css']
})
export class ClientesShellComponent {

}
