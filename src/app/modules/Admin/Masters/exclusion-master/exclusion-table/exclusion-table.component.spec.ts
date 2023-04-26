import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionTableComponent } from './exclusion-table.component';

describe('ExclusionTableComponent', () => {
  let component: ExclusionTableComponent;
  let fixture: ComponentFixture<ExclusionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
