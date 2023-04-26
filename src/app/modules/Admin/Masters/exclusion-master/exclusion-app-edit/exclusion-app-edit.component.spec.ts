import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionAppEditComponent } from './exclusion-app-edit.component';

describe('ExclusionAppEditComponent', () => {
  let component: ExclusionAppEditComponent;
  let fixture: ComponentFixture<ExclusionAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusionAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusionAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
