import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistQuoteComponent } from './exist-quote.component';

describe('ExistQuoteComponent', () => {
  let component: ExistQuoteComponent;
  let fixture: ComponentFixture<ExistQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
