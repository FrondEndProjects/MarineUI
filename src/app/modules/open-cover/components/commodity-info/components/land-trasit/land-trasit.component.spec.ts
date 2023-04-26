import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandTrasitComponent } from './land-trasit.component';

describe('LandTrasitComponent', () => {
  let component: LandTrasitComponent;
  let fixture: ComponentFixture<LandTrasitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandTrasitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandTrasitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
