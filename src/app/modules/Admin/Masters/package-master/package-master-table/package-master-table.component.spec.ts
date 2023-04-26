import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMasterTableComponent } from './package-master-table.component';

describe('PackageMasterTableComponent', () => {
  let component: PackageMasterTableComponent;
  let fixture: ComponentFixture<PackageMasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageMasterTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageMasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
