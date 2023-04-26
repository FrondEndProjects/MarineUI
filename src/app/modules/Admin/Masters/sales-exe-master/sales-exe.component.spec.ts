import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesExeComponent } from './sales-exe.component';

describe('SalesExeComponent', () => {
  let component: SalesExeComponent;
  let fixture: ComponentFixture<SalesExeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesExeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesExeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
