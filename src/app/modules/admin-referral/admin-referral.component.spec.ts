import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReferralComponent } from './admin-referral.component';

describe('AdminReferralComponent', () => {
  let component: AdminReferralComponent;
  let fixture: ComponentFixture<AdminReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
