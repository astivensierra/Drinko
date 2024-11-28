import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component";

@Component({
    selector: 'app-sobre-nosotros',
    standalone: true,
    templateUrl: './sobre-nosotros.component.html',
    styleUrl: './sobre-nosotros.component.css',
    imports: [EncabezadoComponent]
})
export class SobreNosotrosComponent {

}
