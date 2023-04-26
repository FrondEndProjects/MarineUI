import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCoverTableComponent } from './country-cover-table.component';

describe('CountryCoverTableComponent', () => {
  let component: CountryCoverTableComponent;
  let fixture: ComponentFixture<CountryCoverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCoverTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCoverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
