import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTermAppEditComponent } from './sale-term-app-edit.component';

describe('SaleTermAppEditComponent', () => {
  let component: SaleTermAppEditComponent;
  let fixture: ComponentFixture<SaleTermAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleTermAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTermAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
