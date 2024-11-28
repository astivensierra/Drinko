import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/models/categoria.model';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './gestion-categorias.component.html',
  styleUrls: ['./gestion-categorias.component.css']
})
export class GestionCategoriasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: Categoria[] = [];

  nuevaCategoria: Categoria = {
    id: '',
    nombre: ''
  };

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe((categorias) => {
      this.dataSource = categorias;
    });
  }

  actualizarCategoria(id: string, categoria: Categoria): void {
    this.categoriaService.actualizarCategoria(id, categoria).subscribe(() => {
      alert('Categoria actualizada');
      this.categoriaService.obtenerCategorias().subscribe((categorias) => {
        this.dataSource = categorias;
      });
    }, (error) => {
      console.error('Error al actualizar la categoria:', error);
    });
  }

  crearCategoria(categoria: Categoria): void {
    this.categoriaService.crearCategoria(categoria).subscribe(() => {
      alert('Categoria creada');
      this.categoriaService.obtenerCategorias().subscribe((categorias) => {
        this.dataSource = categorias;
      });
    }, (error) => {
      console.error('Error al crear la categoria:', error);
    });
  }

  eliminarCategoria(id: string): void {
    this.categoriaService.eliminarCategoria(id).subscribe(() => {
      alert('Categoria eliminada');
      this.categoriaService.obtenerCategorias().subscribe((categorias) => {
        this.dataSource = categorias;
      });
    }, (error) => {
      console.error('Error al eliminar la categoria:', error);
    });
  }

  obtenerCategoriaPorId(id: string): void {
    this.categoriaService.obtenerCategoriaPorId(id).subscribe((categoria) => {
      console.log('Categoria:', categoria);
    }, (error) => {
      console.error('Error al obtener la categoria por ID:', error);
    });
  }
}
