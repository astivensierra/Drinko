import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../shared/components/encabezado/encabezado.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-usuario-layout',
  standalone: true,
  imports: [EncabezadoComponent, RouterModule, InicioComponent],
  templateUrl: './usuario-layout-component.component.html',
  styles: []
})
export class UsuarioLayoutComponent {}
