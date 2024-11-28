import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatIconModule,
    MatButtonModule,
    FormsModule 
  ],
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  loggedIn = false;
  toggleUserMenu = false;
  toggleCategories = false;
  categorias: Categoria[] = [];
  busqueda: string = '';
  @Output() buscar = new EventEmitter<string>(); 

  constructor(private authService: AuthService, 
              private categoriaService: CategoriaService
            ) {} // Inyecta el servicio de búsqueda

  toggleUserActions(): void {
    this.toggleUserMenu = !this.toggleUserMenu;
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      error => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.loggedIn = false;
    this.toggleUserMenu = false; // Asegúrate de cerrar el menú de usuario al cerrar la sesión
  }

  ngOnInit(): void {
    // Verificar si el usuario está autenticado al cargar el componente
    this.loggedIn = this.authService.obtenerToken() !== null;
    // Cargar las categorías al iniciar el componente
    this.cargarCategorias();
  }

  

  buscarProducto(nombreProducto: string){
    this.buscar.emit(nombreProducto)
  }
}
