import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTermComponent } from './sale-term.component';

describe('SaleTermComponent', () => {
  let component: SaleTermComponent;
  let fixture: ComponentFixture<SaleTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
