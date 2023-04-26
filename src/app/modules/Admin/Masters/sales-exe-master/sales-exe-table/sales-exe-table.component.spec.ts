import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesExeTableComponent } from './sales-exe-table.component';

describe('SalesExeTableComponent', () => {
  let component: SalesExeTableComponent;
  let fixture: ComponentFixture<SalesExeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesExeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesExeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
