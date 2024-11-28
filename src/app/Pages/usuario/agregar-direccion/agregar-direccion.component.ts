import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Direccion, DireccionCommand, DireccionCommon } from '../../../core/models/direccion.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component"; // Importa la función v4 de uuid

@Component({
    selector: 'app-agregar-direccion',
    standalone: true,
    templateUrl: './agregar-direccion.component.html',
    styleUrl: './agregar-direccion.component.css',
    imports: [FormsModule, CommonModule, EncabezadoComponent]
})
export class AgregarDireccionComponent {
  nuevaDireccion: DireccionCommon = {
    linea1: '',
    linea2: '',
    ciudad: '',
    departamento: '',
    codigoPostal: 0
  };

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  agregarDireccion(): void {
    const usuario = this.authService.obtenerDatosUsuario();
    if (usuario) {
      const direccionCommand: DireccionCommand = {
        usuarioId: usuario.usuarioId,
        direccion: this.nuevaDireccion
      };

      this.usuarioService.agregarDireccion(direccionCommand).subscribe(
        (usuarioActualizado) => {
          console.log("Dirección agregada con éxito", usuarioActualizado);
          this.router.navigate(['/usuario/realizar-pedido']);
        },
        error => {
          console.log("Error al agregar la dirección: ", error);
        }
      );
    }
  }
}
