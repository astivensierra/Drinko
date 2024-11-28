import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDeProductoComponent } from './filtro-de-producto.component';

describe('FiltroDeProductoComponent', () => {
  let component: FiltroDeProductoComponent;
  let fixture: ComponentFixture<FiltroDeProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroDeProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroDeProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
