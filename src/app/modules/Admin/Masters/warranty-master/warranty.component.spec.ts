import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyComponent } from './warranty.component';

describe('ConveyanceComponent', () => {
  let component: WarrantyComponent;
  let fixture: ComponentFixture<WarrantyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
