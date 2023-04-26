import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityAppEditComponent } from './commodity-app-edit.component';

describe('CommodityAppEditComponent', () => {
  let component: CommodityAppEditComponent;
  let fixture: ComponentFixture<CommodityAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
