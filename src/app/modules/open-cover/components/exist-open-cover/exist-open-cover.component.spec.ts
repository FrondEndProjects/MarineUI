import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistOpenCoverComponent } from './exist-open-cover.component';

describe('ExistOpenCoverComponent', () => {
  let component: ExistOpenCoverComponent;
  let fixture: ComponentFixture<ExistOpenCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistOpenCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistOpenCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
