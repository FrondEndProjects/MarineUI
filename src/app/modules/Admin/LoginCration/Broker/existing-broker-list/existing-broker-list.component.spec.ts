import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBrokerListComponent } from './existing-broker-list.component';

describe('ExistingBrokerListComponent', () => {
  let component: ExistingBrokerListComponent;
  let fixture: ComponentFixture<ExistingBrokerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingBrokerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBrokerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
