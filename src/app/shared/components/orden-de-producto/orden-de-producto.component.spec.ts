import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDeProductoComponent } from './orden-de-producto.component';

describe('OrdenDeProductoComponent', () => {
  let component: OrdenDeProductoComponent;
  let fixture: ComponentFixture<OrdenDeProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenDeProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdenDeProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
