import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeAppEditComponent } from './exchange-app-edit.component';

describe('ExchangeAppEditComponent', () => {
  let component: ExchangeAppEditComponent;
  let fixture: ComponentFixture<ExchangeAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
