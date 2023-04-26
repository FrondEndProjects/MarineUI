import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementGridComponent } from './endorsement-grid.component';

describe('EndorsementGridComponent', () => {
  let component: EndorsementGridComponent;
  let fixture: ComponentFixture<EndorsementGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndorsementGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndorsementGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
