import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaDeProductoDePedidoComponent } from './tarjeta-de-producto-de-pedido.component';

describe('TarjetaDeProductoDePedidoComponent', () => {
  let component: TarjetaDeProductoDePedidoComponent;
  let fixture: ComponentFixture<TarjetaDeProductoDePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaDeProductoDePedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaDeProductoDePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
