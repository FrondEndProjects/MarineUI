import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedQuotesComponent } from './approved-quotes.component';

describe('ApprovedQuotesComponent', () => {
  let component: ApprovedQuotesComponent;
  let fixture: ComponentFixture<ApprovedQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
