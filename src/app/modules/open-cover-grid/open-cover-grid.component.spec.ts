import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCoverGridComponent } from './open-cover-grid.component';

describe('OpenCoverGridComponent', () => {
  let component: OpenCoverGridComponent;
  let fixture: ComponentFixture<OpenCoverGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCoverGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCoverGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
