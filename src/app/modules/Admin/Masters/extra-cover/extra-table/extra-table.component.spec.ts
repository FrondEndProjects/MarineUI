import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraTableComponent } from './extra-table.component';

describe('ExtraTableComponent', () => {
  let component: ExtraTableComponent;
  let fixture: ComponentFixture<ExtraTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
