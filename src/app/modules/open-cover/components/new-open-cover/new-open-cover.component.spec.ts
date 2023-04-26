import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOpenCoverComponent } from './new-open-cover.component';

describe('NewOpenCoverComponent', () => {
  let component: NewOpenCoverComponent;
  let fixture: ComponentFixture<NewOpenCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOpenCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOpenCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
