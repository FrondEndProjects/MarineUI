import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityClausesTableComponent } from './commodity-clauses-table.component';

describe('CommodityClausesTableComponent', () => {
  let component: CommodityClausesTableComponent;
  let fixture: ComponentFixture<CommodityClausesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityClausesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityClausesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
