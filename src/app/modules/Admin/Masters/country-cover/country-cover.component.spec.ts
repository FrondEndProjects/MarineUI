import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCoverComponent } from './country-cover.component';

describe('ConveyanceComponent', () => {
  let component: CountryCoverComponent;
  let fixture: ComponentFixture<CountryCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
