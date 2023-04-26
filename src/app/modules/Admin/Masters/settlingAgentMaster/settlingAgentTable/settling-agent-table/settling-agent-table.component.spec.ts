import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlingAgentTableComponent } from './settling-agent-table.component';

describe('SettlingAgentTableComponent', () => {
  let component: SettlingAgentTableComponent;
  let fixture: ComponentFixture<SettlingAgentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlingAgentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlingAgentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
