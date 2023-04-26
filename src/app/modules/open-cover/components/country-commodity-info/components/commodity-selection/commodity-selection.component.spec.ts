import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditySelectionComponent } from './commodity-selection.component';

describe('CommoditySelectionComponent', () => {
  let component: CommoditySelectionComponent;
  let fixture: ComponentFixture<CommoditySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoditySelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoditySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
