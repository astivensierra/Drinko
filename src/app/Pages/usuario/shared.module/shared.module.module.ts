// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalButtonComponent } from '../paypal-button-component/paypal-button-component.component';

@NgModule({
  declarations: [PaypalButtonComponent],
  imports: [CommonModule],
  exports: [PaypalButtonComponent]
})
export class SharedModule { }
