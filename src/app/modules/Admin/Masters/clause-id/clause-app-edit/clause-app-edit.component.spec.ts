import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseAppEditComponent } from './clause-app-edit.component';

describe('ClauseAppEditComponent', () => {
  let component: ClauseAppEditComponent;
  let fixture: ComponentFixture<ClauseAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClauseAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClauseAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
