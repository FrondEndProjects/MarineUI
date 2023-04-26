import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityExcessAppEditComponent } from './commodity-excess-app-edit.component';

describe('CommodityExcessAppEditComponent', () => {
  let component: CommodityExcessAppEditComponent;
  let fixture: ComponentFixture<CommodityExcessAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityExcessAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityExcessAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
