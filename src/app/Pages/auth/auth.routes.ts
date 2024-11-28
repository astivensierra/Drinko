import { Routes } from "@angular/router";
import { InicioDeSesionComponent } from "./inicio-de-sesion/inicio-de-sesion.component";
import { RegistroComponent } from "./registro/registro.component";

export const AUTH_ROUTES: Routes = [
    { path: 'inicio-sesion', component: InicioDeSesionComponent  },
    { path: 'registro', component: RegistroComponent }

]