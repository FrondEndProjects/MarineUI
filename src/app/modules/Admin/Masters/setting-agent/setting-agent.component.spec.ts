import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAgentComponent } from './setting-agent.component';

describe('ConveyanceComponent', () => {
  let component: SettingAgentComponent;
  let fixture: ComponentFixture<SettingAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
