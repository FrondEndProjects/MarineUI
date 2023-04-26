import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyGenerateComponent } from './policy-generate.component';

describe('PolicyGenerateComponent', () => {
  let component: PolicyGenerateComponent;
  let fixture: ComponentFixture<PolicyGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
