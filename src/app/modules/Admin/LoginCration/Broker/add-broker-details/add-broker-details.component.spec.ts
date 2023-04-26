import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrokerDetailsComponent } from './add-broker-details.component';

describe('AddBrokerDetailsComponent', () => {
  let component: AddBrokerDetailsComponent;
  let fixture: ComponentFixture<AddBrokerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrokerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrokerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
