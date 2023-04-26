import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAppEditComponent } from './city-app-edit.component';

describe('CityAppEditComponent', () => {
  let component: CityAppEditComponent;
  let fixture: ComponentFixture<CityAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
