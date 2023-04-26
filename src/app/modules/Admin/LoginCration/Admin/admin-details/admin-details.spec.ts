import { AdminListComponent } from './../admin-list/admin-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { UserListComponent } from './user-list.component';
//import {AdminListComponent}

describe('UserListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
