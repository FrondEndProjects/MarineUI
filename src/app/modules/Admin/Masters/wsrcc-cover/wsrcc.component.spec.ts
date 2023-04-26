import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrccComponent } from './wsrcc.component';

describe('ConveyanceComponent', () => {
  let component: WsrccComponent;
  let fixture: ComponentFixture<WsrccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WsrccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
