import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTermTableComponent } from './sale-term-table.component';

describe('SaleTermTableComponent', () => {
  let component: SaleTermTableComponent;
  let fixture: ComponentFixture<SaleTermTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleTermTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTermTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
