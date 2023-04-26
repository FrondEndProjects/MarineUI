import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverAppEditComponent } from './cover-app-edit.component';

describe('CoverAppEditComponent', () => {
  let component: CoverAppEditComponent;
  let fixture: ComponentFixture<CoverAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
