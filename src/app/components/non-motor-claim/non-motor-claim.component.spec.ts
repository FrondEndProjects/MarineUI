import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMotorClaimComponent } from './non-motor-claim.component';

describe('NonMotorClaimComponent', () => {
  let component: NonMotorClaimComponent;
  let fixture: ComponentFixture<NonMotorClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonMotorClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonMotorClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
