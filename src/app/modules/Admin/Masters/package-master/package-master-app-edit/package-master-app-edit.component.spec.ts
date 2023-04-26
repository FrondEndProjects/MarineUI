import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMasterAppEditComponent } from './package-master-app-edit.component';

describe('PackageMasterAppEditComponent', () => {
  let component: PackageMasterAppEditComponent;
  let fixture: ComponentFixture<PackageMasterAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageMasterAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageMasterAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
