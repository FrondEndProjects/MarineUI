import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantAppEditComponent } from './constant-app-edit.component';

describe('ConstantAppEditComponent', () => {
  let component: ConstantAppEditComponent;
  let fixture: ComponentFixture<ConstantAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
