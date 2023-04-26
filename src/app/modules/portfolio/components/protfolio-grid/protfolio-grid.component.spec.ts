import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtfolioGridComponent } from './protfolio-grid.component';

describe('ProtfolioGridComponent', () => {
  let component: ProtfolioGridComponent;
  let fixture: ComponentFixture<ProtfolioGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtfolioGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtfolioGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
