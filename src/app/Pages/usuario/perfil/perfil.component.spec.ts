import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';

import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { HttpClientModule } from '@angular/common/http';

/*describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent, HttpClientModule],
      providers: [AuthService, UsuarioService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/
