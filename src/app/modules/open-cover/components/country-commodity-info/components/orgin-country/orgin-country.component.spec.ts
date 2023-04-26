import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrginCountryComponent } from './orgin-country.component';

describe('OrginCountryComponent', () => {
  let component: OrginCountryComponent;
  let fixture: ComponentFixture<OrginCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrginCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrginCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
