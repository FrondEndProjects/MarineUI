import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveyanceComponent } from './conveyance.component';

describe('ConveyanceComponent', () => {
  let component: ConveyanceComponent;
  let fixture: ComponentFixture<ConveyanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveyanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveyanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
