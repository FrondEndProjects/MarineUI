import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrccAppEditComponent } from './wsrcc-app-edit.component';

describe('WsrccAppEditComponent', () => {
  let component: WsrccAppEditComponent;
  let fixture: ComponentFixture<WsrccAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrccAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WsrccAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
