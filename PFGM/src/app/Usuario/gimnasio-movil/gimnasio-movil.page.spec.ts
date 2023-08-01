import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GimnasioMovilPage } from './gimnasio-movil.page';

describe('GimnasioMovilPage', () => {
  let component: GimnasioMovilPage;
  let fixture: ComponentFixture<GimnasioMovilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GimnasioMovilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
