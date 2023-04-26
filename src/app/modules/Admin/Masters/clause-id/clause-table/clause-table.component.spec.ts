import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseTableComponent } from './clause-table.component';

describe('ClauseTableComponent', () => {
  let component: ClauseTableComponent;
  let fixture: ComponentFixture<ClauseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClauseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClauseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
