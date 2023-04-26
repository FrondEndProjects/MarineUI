import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarRateMasterComponent } from './war-rate-master.component';

describe('ConveyanceComponent', () => {
  let component: WarRateMasterComponent;
  let fixture: ComponentFixture<WarRateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarRateMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarRateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
