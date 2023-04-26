import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarRateAppEditComponent } from './war-rate-app-edit.component';

describe('WarRateAppEditComponent', () => {
  let component: WarRateAppEditComponent;
  let fixture: ComponentFixture<WarRateAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarRateAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarRateAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
