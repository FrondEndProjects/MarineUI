import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroCusLoginComponent } from './bro-cus-login.component';

describe('BroCusLoginComponent', () => {
  let component: BroCusLoginComponent;
  let fixture: ComponentFixture<BroCusLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroCusLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroCusLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
