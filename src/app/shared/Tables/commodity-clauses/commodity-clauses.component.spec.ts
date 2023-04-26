import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityClausesComponent } from './commodity-clauses.component';

describe('CommodityClausesComponent', () => {
  let component: CommodityClausesComponent;
  let fixture: ComponentFixture<CommodityClausesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityClausesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityClausesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
