import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBrokerDetailsComponent } from './new-broker-details.component';

describe('NewBrokerDetailsComponent', () => {
  let component: NewBrokerDetailsComponent;
  let fixture: ComponentFixture<NewBrokerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBrokerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBrokerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
