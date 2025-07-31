import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesShellComponent } from './clientes-shell.component';

describe('ClientesShellComponent', () => {
  let component: ClientesShellComponent;
  let fixture: ComponentFixture<ClientesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 