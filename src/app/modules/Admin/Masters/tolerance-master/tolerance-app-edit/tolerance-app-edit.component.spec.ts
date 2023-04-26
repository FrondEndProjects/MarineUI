import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToleranceAppEditComponent } from './tolerance-app-edit.component';

describe('ToleranceAppEditComponent', () => {
  let component: ToleranceAppEditComponent;
  let fixture: ComponentFixture<ToleranceAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToleranceAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToleranceAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
