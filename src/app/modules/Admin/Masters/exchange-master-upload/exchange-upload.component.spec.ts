import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeUploadComponent } from './exchange-upload.component';

describe('ConveyanceComponent', () => {
  let component: ExchangeUploadComponent;
  let fixture: ComponentFixture<ExchangeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
