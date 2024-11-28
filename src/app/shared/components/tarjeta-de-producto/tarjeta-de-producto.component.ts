import { Component, Input } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';
import { RouterModule } from '@angular/router';
import { DineroPipe } from "../../pipes/dinero/dinero.pipe";


@Component({
    selector: 'app-tarjeta-de-producto',
    standalone: true,
    templateUrl: './tarjeta-de-producto.component.html',
    styleUrl: './tarjeta-de-producto.component.css',
    imports: [
        RouterModule,
        DineroPipe
    ]
})
export class TarjetaDeProductoComponent {
  @Input() producto: Producto = {} as Producto; // Asignación de valor por defecto
}
