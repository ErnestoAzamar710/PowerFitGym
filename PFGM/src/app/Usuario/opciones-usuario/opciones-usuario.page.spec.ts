import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesUsuarioPage } from './opciones-usuario.page';

describe('OpcionesUsuarioPage', () => {
  let component: OpcionesUsuarioPage;
  let fixture: ComponentFixture<OpcionesUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OpcionesUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
