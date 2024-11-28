import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://localhost:7248/productos'; // URL base de tu API
  private productos: Producto[] = []; // Almacenar productos localmente

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map((productos: Producto[]) => {
        this.productos = productos; // Almacenar productos localmente
        return productos;
      })
    );
  }

  // Método para filtrar productos localmente por nombre
  filtrarProductos(busqueda: string): Observable<Producto[]> {
    if (!busqueda.trim()) {
      return this.obtenerProductos(); // Devuelve todos los productos si no hay búsqueda
    }
    const filtro = busqueda.trim().toLowerCase();
    const productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(filtro)
    );
    return of(productosFiltrados); // Devuelve los productos filtrados
  }

  obtenerProductosPorCategoria(categoriaId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/listar-por-categoria/${categoriaId}`);
  }

  obtenerProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizarProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
