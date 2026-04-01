import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalamaLoginPageComponent } from './salama-login-page.component';

describe('SalamaLoginPageComponent', () => {
  let component: SalamaLoginPageComponent;
  let fixture: ComponentFixture<SalamaLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalamaLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalamaLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
