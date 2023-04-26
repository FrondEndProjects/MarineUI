//import { AdminListComponent } from './../admin-list/admin-list.component';
import { IssuerListComponent } from './issuer-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { UserListComponent } from './user-list.component';
//import {AdminListComponent}

describe('UserListComponent', () => {
  let component: IssuerListComponent;
  let fixture: ComponentFixture<IssuerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
