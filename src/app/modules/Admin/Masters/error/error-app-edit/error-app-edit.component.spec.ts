import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAppEditComponent } from './error-app-edit.component';

describe('ErrorAppEditComponent', () => {
  let component: ErrorAppEditComponent;
  let fixture: ComponentFixture<ErrorAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
