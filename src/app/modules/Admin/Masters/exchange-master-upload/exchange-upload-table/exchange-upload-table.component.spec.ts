import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeUploadTableComponent } from './exchange-upload-table.component';

describe('ExchangeUploadTableComponent', () => {
  let component: ExchangeUploadTableComponent;
  let fixture: ComponentFixture<ExchangeUploadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeUploadTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeUploadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
