import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyGenerateCoverComponent } from './policy-generate-cover.component';

describe('PolicyGenerateCoverComponent', () => {
  let component: PolicyGenerateCoverComponent;
  let fixture: ComponentFixture<PolicyGenerateCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyGenerateCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyGenerateCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
