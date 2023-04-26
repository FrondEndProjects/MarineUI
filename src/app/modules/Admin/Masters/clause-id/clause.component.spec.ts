import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseComponent } from './clause.component';

describe('ConveyanceComponent', () => {
  let component: ClauseComponent;
  let fixture: ComponentFixture<ClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
