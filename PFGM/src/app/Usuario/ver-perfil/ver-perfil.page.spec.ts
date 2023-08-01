import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPerfilPage } from './ver-perfil.page';

describe('VerPerfilPage', () => {
  let component: VerPerfilPage;
  let fixture: ComponentFixture<VerPerfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
