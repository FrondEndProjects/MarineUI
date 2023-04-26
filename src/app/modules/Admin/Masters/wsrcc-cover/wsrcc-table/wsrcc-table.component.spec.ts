import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrccTableComponent } from './wsrcc-table.component';

describe('WsrccTableComponent', () => {
  let component: WsrccTableComponent;
  let fixture: ComponentFixture<WsrccTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrccTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WsrccTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
