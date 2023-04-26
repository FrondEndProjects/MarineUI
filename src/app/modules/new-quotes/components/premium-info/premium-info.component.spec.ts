import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumInfoComponent } from './premium-info.component';

describe('PremiumInfoComponent', () => {
  let component: PremiumInfoComponent;
  let fixture: ComponentFixture<PremiumInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
