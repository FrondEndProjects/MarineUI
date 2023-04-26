import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportAppEditComponent } from './transport-app-edit.component';

describe('TransportAppEditComponent', () => {
  let component: TransportAppEditComponent;
  let fixture: ComponentFixture<TransportAppEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportAppEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportAppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
