import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrazoPage } from './brazo.page';

describe('BrazoPage', () => {
  let component: BrazoPage;
  let fixture: ComponentFixture<BrazoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BrazoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
