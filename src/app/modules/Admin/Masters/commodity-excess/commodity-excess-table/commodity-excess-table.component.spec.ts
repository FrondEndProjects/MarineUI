import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityExcessTableComponent } from './commodity-excess-table.component';

describe('CommodityExcessTableComponent', () => {
  let component: CommodityExcessTableComponent;
  let fixture: ComponentFixture<CommodityExcessTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityExcessTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityExcessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
