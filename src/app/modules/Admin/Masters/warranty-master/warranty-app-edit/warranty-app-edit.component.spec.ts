import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyAppEditComponent } from './warranty-app-edit.component';

describe('WarrantyAppEditComponent', () => {
  let component: WarrantyAppEditComponent;
  let fixture: ComponentFixture<WarrantyAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
