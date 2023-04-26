import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnApprovedComponent } from './un-approved.component';

describe('UnApprovedComponent', () => {
  let component: UnApprovedComponent;
  let fixture: ComponentFixture<UnApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
