import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAgentAppEditComponent } from './setting-agent-app-edit.component';

describe('SettingAgentAppEditComponent', () => {
  let component: SettingAgentAppEditComponent;
  let fixture: ComponentFixture<SettingAgentAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAgentAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAgentAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
