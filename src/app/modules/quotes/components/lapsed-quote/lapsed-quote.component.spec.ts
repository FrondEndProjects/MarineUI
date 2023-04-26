import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapsedQuoteComponent } from './lapsed-quote.component';

describe('LapsedQuoteComponent', () => {
  let component: LapsedQuoteComponent;
  let fixture: ComponentFixture<LapsedQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LapsedQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LapsedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
