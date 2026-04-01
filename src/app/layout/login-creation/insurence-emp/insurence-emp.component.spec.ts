import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurenceEmpComponent } from './insurence-emp.component';

describe('InsurenceEmpComponent', () => {
  let component: InsurenceEmpComponent;
  let fixture: ComponentFixture<InsurenceEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsurenceEmpComponent]
    });
    fixture = TestBed.createComponent(InsurenceEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
