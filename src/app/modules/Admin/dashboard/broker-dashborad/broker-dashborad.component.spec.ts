import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerDashboradComponent } from './broker-dashborad.component';

describe('BrokerDashboradComponent', () => {
  let component: BrokerDashboradComponent;
  let fixture: ComponentFixture<BrokerDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerDashboradComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
