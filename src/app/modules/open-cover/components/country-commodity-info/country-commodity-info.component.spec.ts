import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCommodityInfoComponent } from './country-commodity-info.component';

describe('CountryCommodityInfoComponent', () => {
  let component: CountryCommodityInfoComponent;
  let fixture: ComponentFixture<CountryCommodityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCommodityInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCommodityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
