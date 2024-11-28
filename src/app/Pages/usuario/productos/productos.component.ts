import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component";
import { TarjetaDeProductoComponent } from "../../../shared/components/tarjeta-de-producto/tarjeta-de-producto.component";
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';


@Component({
    selector: 'app-productos',
    standalone: true,
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.css',
    imports: [EncabezadoComponent, TarjetaDeProductoComponent]
})
export class ProductosComponent implements OnInit {
  categoriaId: string = ''; // Aquí almacenarás el ID de la categoría pasado por queryParams
  productos: Producto[] = [];

  constructor(private route: ActivatedRoute, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.categoriaId = params['categoriaId'];
      if (this.categoriaId) {
        this.obtenerProductos(); // Llama a obtenerProductos() si hay una categoría ID
      }
    });
  }
  

  obtenerProductos(): void {
    this.productoService.obtenerProductosPorCategoria(this.categoriaId).subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        console.log(this.productos)
      },
      (error: any) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}

