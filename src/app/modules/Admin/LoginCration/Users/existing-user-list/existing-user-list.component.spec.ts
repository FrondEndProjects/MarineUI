import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingUserListComponent } from './existing-user-list.component';

describe('ExistingUserListComponent', () => {
  let component: ExistingUserListComponent;
  let fixture: ComponentFixture<ExistingUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
