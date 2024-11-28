import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component";

@Component({
    selector: 'app-contacto',
    standalone: true,
    templateUrl: './contacto.component.html',
    styleUrl: './contacto.component.css',
    imports: [EncabezadoComponent]
})
export class ContactoComponent {

}
