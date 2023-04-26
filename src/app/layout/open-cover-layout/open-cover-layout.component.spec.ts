import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCoverLayoutComponent } from './open-cover-layout.component';

describe('OpenCoverLayoutComponent', () => {
  let component: OpenCoverLayoutComponent;
  let fixture: ComponentFixture<OpenCoverLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCoverLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCoverLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
