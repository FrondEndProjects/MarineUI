import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverTableComponent } from './cover-table.component';

describe('CoverTableComponent', () => {
  let component: CoverTableComponent;
  let fixture: ComponentFixture<CoverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
