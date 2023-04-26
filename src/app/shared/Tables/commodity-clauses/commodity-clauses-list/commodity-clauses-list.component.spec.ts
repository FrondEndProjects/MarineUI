import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityClausesListComponent } from './commodity-clauses-list.component';

describe('CommodityClausesListComponent', () => {
  let component: CommodityClausesListComponent;
  let fixture: ComponentFixture<CommodityClausesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityClausesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityClausesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
