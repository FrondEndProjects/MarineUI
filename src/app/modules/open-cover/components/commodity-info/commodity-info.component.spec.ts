import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityInfoComponent } from './commodity-info.component';

describe('CommodityInfoComponent', () => {
  let component: CommodityInfoComponent;
  let fixture: ComponentFixture<CommodityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
