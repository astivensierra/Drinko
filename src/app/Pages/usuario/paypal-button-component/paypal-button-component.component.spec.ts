import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalButtonComponentComponent } from './paypal-button-component.component';

describe('PaypalButtonComponentComponent', () => {
  let component: PaypalButtonComponentComponent;
  let fixture: ComponentFixture<PaypalButtonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypalButtonComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaypalButtonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
