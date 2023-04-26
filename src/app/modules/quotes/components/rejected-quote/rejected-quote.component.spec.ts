import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedQuoteComponent } from './rejected-quote.component';

describe('RejectedQuoteComponent', () => {
  let component: RejectedQuoteComponent;
  let fixture: ComponentFixture<RejectedQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
