import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPoliciesComponent } from './failed-policies.component';

describe('FailedPoliciesComponent', () => {
  let component: FailedPoliciesComponent;
  let fixture: ComponentFixture<FailedPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
