import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpencoverHeaderInfoComponent } from './opencover-header-info.component';

describe('OpencoverHeaderInfoComponent', () => {
  let component: OpencoverHeaderInfoComponent;
  let fixture: ComponentFixture<OpencoverHeaderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpencoverHeaderInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpencoverHeaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
