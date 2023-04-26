import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankMasterTableComponent } from './bank-master-table.component';

describe('BankMasterTableComponent', () => {
  let component: BankMasterTableComponent;
  let fixture: ComponentFixture<BankMasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankMasterTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankMasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
