import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledPoliciesComponent } from './canceled-policies.component';

describe('CanceledPoliciesComponent', () => {
  let component: CanceledPoliciesComponent;
  let fixture: ComponentFixture<CanceledPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanceledPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
