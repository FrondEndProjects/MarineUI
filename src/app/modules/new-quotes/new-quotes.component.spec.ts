import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuotesComponent } from './new-quotes.component';

describe('NewQuotesComponent', () => {
  let component: NewQuotesComponent;
  let fixture: ComponentFixture<NewQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
