import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './Pages/usuario/inicio/inicio.component';
import { UsuarioLayoutComponent } from './Pages/usuario/usuario-layout-component/usuario-layout-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicioComponent, UsuarioLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nayid';

}
