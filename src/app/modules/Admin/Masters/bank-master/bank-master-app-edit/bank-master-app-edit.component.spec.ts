import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankMasterAppEditComponent } from './bank-master-app-edit.component';

describe('BankMasterAppEditComponent', () => {
  let component: BankMasterAppEditComponent;
  let fixture: ComponentFixture<BankMasterAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankMasterAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankMasterAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
