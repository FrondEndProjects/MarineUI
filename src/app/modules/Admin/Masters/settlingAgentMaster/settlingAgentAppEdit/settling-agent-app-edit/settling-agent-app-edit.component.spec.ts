import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlingAgentAppEditComponent } from './settling-agent-app-edit.component';

describe('SettlingAgentAppEditComponent', () => {
  let component: SettlingAgentAppEditComponent;
  let fixture: ComponentFixture<SettlingAgentAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlingAgentAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlingAgentAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
