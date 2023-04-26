import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedQuotesComponent } from './rejected-quotes.component';

describe('RejectedQuotesComponent', () => {
  let component: RejectedQuotesComponent;
  let fixture: ComponentFixture<RejectedQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
