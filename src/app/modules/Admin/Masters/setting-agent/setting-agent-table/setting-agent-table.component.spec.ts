import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAgentTableComponent } from './setting-agent-table.component';

describe('SettingAgentTableComponent', () => {
  let component: SettingAgentTableComponent;
  let fixture: ComponentFixture<SettingAgentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAgentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAgentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
