import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantTableComponent } from './constant-table.component';

describe('ConstantTableComponent', () => {
  let component: ConstantTableComponent;
  let fixture: ComponentFixture<ConstantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
