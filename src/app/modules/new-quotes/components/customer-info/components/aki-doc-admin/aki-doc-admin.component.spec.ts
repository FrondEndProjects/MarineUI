import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkiDocAdminComponent } from './aki-doc-admin.component';

describe('AkiDocAdminComponent', () => {
  let component: AkiDocAdminComponent;
  let fixture: ComponentFixture<AkiDocAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkiDocAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkiDocAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
