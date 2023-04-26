import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarRateTableComponent } from './war-rate-table.component';

describe('WarRateTableComponent', () => {
  let component: WarRateTableComponent;
  let fixture: ComponentFixture<WarRateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarRateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarRateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
