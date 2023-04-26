import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeUploadAppEditComponent } from './exchange-upload-app-edit.component';

describe('ExchangeUploadAppEditComponent', () => {
  let component: ExchangeUploadAppEditComponent;
  let fixture: ComponentFixture<ExchangeUploadAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeUploadAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeUploadAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
