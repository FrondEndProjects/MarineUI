import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCoverAppEditComponent } from './country-cover-app-edit.component';

describe('CountryCoverAppEditComponent', () => {
  let component: CountryCoverAppEditComponent;
  let fixture: ComponentFixture<CountryCoverAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCoverAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCoverAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
