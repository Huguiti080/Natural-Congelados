import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCriticoComponent } from './stock-critico.component';

describe('StockCriticoComponent', () => {
  let component: StockCriticoComponent;
  let fixture: ComponentFixture<StockCriticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCriticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockCriticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
