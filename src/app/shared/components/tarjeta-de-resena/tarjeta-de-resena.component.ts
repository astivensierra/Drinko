import { Component, Input } from '@angular/core';
import { Resena } from '../../../core/models/resena.model';

@Component({
  selector: 'app-tarjeta-de-resena',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-de-resena.component.html',
  styleUrl: './tarjeta-de-resena.component.css'
})
export class TarjetaDeResenaComponent {
  @Input() resena: Resena = {} as Resena;
}
