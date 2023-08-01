import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoSuscripcionPage } from './pago-suscripcion.page';

describe('PagoSuscripcionPage', () => {
  let component: PagoSuscripcionPage;
  let fixture: ComponentFixture<PagoSuscripcionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagoSuscripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
