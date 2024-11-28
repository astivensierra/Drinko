import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component";
import { Resena } from '../../../core/models/resena.model';
import { TarjetaDeResenaComponent } from '../../../shared/components/tarjeta-de-resena/tarjeta-de-resena.component';

@Component({
    selector: 'app-resenas',
    standalone: true,
    templateUrl: './resenas.component.html',
    styleUrl: './resenas.component.css',
    imports: [EncabezadoComponent, TarjetaDeResenaComponent]
})
export class ResenasComponent {
    resenas: Resena[] = [
        {
            id: 1,
            imagen: "https://img.freepik.com/foto-gratis/hombre-morena-camiseta-oscura-que-muestra-gesto-namaste-mirando-relajado-vista-frontal_176474-64642.jpg?w=740&t=st=1718338445~exp=1718339045~hmac=7760dd0b03e668b230382f10ffc6ceb1a3af13a1fd3fba8a20b701d3f1954ea0",
            titulo: "Alex Gonzalez",
            descripcion: "¡La mejor licorería de Valledupar! Siempre encuentro lo que busco y el personal es muy amable."
        },
        {
            id: 2,
            imagen: "https://img.freepik.com/foto-gratis/hombre-panadero-camiseta-delantal-pie-brazos-cruzados-mirando-alegre_176474-23426.jpg?w=740&t=st=1718338502~exp=1718339102~hmac=5eab636d07b9b36a4ee9b9a4aadb94d7214308829d2445da2365da3e582127d3",
            titulo: "Steven Molina",
            descripcion: "Me encanta la amplia selección de vinos y licores que ofrecen. Siempre encuentro algo nuevo para probar."
        },
        {
            id: 3,
            imagen: "https://img.freepik.com/foto-gratis/chico-caucasico-atractivo-seguro-beige-pullon-sonriendo-ampliamente-mientras-esta-pie-contra-gris_176420-44508.jpg?t=st=1718338340~exp=1718341940~hmac=8f7263c4a2de9bc1bb65ae7d23e6e6c663e482fb651f5e2e536f450d077de1c0&w=740",
            titulo: "Kevin Perez",
            descripcion: "Realicé mi pedido online y llegó en menos de 24 horas. ¡Impresionante servicio de entrega!"
        },
    ]
}
