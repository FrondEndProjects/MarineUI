import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeComponent } from './exchange.component';

describe('ConveyanceComponent', () => {
  let component: ExchangeComponent;
  let fixture: ComponentFixture<ExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
