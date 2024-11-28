import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import { TarjetaDeProductoComponent } from '../../../shared/components/tarjeta-de-producto/tarjeta-de-producto.component';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from '../../../shared/components/encabezado/encabezado.component';
import { DineroPipe } from '../../../shared/pipes/dinero/dinero.pipe';
import { BuscarPipe } from "../../../shared/pipes/buscar/buscar.pipe";

@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    imports: [CommonModule,
        EncabezadoComponent,
        TarjetaDeProductoComponent,
        DineroPipe, BuscarPipe]
})
export class InicioComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  mensaje = {msg: "Hola Mundo"}
  date = new Date()
  dinero = 19500

  busqueda: string = ''

  obtenerProdcutoDeBusqueda(nombreProducto: string){
    this.busqueda = nombreProducto
  }

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next:(productos: Producto[]) => {
        this.productos = productos;
        this.productosFiltrados = [...productos]; // Inicialmente todos los productos
      },
      error: (error: any) => {
        console.error('Error al obtener los productos:', error);
      }
    }
    );
  }


  trackByFn(index: number, producto: Producto): string {
    return producto.id; // Asegúrate de devolver un identificador único aquí
  }
}