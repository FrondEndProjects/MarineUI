import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPolicyLayoutComponent } from './individual-policy-layout.component';

describe('IndividualPolicyLayoutComponent', () => {
  let component: IndividualPolicyLayoutComponent;
  let fixture: ComponentFixture<IndividualPolicyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualPolicyLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPolicyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
