import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInformComponent } from './header-inform.component';

describe('HeaderInformComponent', () => {
  let component: HeaderInformComponent;
  let fixture: ComponentFixture<HeaderInformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderInformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
