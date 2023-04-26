import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesExeAppEditComponent } from './sales-exe-app-edit.component';

describe('SalesExeAppEditComponent', () => {
  let component: SalesExeAppEditComponent;
  let fixture: ComponentFixture<SalesExeAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesExeAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesExeAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
