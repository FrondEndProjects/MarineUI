import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementTypeComponent } from './endorsement-type.component';

describe('EndorsementTypeComponent', () => {
  let component: EndorsementTypeComponent;
  let fixture: ComponentFixture<EndorsementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndorsementTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndorsementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
