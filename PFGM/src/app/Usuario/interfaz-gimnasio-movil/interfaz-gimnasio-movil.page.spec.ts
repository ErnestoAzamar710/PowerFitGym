import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfazGimnasioMovilPage } from './interfaz-gimnasio-movil.page';

describe('InterfazGimnasioMovilPage', () => {
  let component: InterfazGimnasioMovilPage;
  let fixture: ComponentFixture<InterfazGimnasioMovilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InterfazGimnasioMovilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
