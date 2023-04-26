import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveyanceTableComponent } from './conveyance-table.component';

describe('ConveyanceTableComponent', () => {
  let component: ConveyanceTableComponent;
  let fixture: ComponentFixture<ConveyanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveyanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveyanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
