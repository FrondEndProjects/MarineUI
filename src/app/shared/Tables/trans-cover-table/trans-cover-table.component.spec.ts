import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransCoverTableComponent } from './trans-cover-table.component';

describe('TransCoverTableComponent', () => {
  let component: TransCoverTableComponent;
  let fixture: ComponentFixture<TransCoverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransCoverTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransCoverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
