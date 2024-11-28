import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';

@Pipe({
  name: 'buscar',
  standalone: true
})
export class BuscarPipe implements PipeTransform {

  transform(listaProductos: Producto[], entradaInput: string): Producto[] {
    entradaInput = entradaInput ? entradaInput.toLowerCase() : ''
    
    return entradaInput ? listaProductos.filter(valor => valor.nombre.toLowerCase()
    .includes(entradaInput))  : listaProductos
  }

}
