import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyQuoteComponent } from './copy-quote.component';

describe('CopyQuoteComponent', () => {
  let component: CopyQuoteComponent;
  let fixture: ComponentFixture<CopyQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
