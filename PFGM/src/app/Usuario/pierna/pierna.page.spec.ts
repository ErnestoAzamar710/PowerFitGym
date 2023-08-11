import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PiernaPage } from './pierna.page';

describe('PiernaPage', () => {
  let component: PiernaPage;
  let fixture: ComponentFixture<PiernaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PiernaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
