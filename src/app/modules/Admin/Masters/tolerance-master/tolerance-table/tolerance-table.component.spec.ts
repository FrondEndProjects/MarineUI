import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToleranceTableComponent } from './tolerance-table.component';

describe('ToleranceTableComponent', () => {
  let component: ToleranceTableComponent;
  let fixture: ComponentFixture<ToleranceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToleranceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToleranceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
