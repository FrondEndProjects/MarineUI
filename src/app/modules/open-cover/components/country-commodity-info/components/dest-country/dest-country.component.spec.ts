import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestCountryComponent } from './dest-country.component';

describe('DestCountryComponent', () => {
  let component: DestCountryComponent;
  let fixture: ComponentFixture<DestCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
