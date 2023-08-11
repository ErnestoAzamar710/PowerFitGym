import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbdomenPage } from './abdomen.page';

describe('AbdomenPage', () => {
  let component: AbdomenPage;
  let fixture: ComponentFixture<AbdomenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AbdomenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
