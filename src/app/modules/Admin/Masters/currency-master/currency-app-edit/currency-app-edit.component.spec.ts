import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyAppEditComponent } from './currency-app-edit.component';

describe('CurrencyAppEditComponent', () => {
  let component: CurrencyAppEditComponent;
  let fixture: ComponentFixture<CurrencyAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
