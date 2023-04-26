import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraAppEditComponent } from './extra-app-edit.component';

describe('ExtraAppEditComponent', () => {
  let component: ExtraAppEditComponent;
  let fixture: ComponentFixture<ExtraAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
