import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService, ProductoStockCritico } from '../../services/stock.service';

@Component({
  selector: 'app-stock-critico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-critico.component.html',
  styleUrls: ['./stock-critico.component.css']
})
export class StockCriticoComponent implements OnInit {
  productosCriticos: ProductoStockCritico[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.obtenerStockCritico().subscribe(data => {
      this.productosCriticos = data;
    });
  }
}
