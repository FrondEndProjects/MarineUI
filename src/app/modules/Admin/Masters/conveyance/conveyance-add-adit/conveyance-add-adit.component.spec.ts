import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveyanceAddAditComponent } from './conveyance-add-adit.component';

describe('ConveyanceAddAditComponent', () => {
  let component: ConveyanceAddAditComponent;
  let fixture: ComponentFixture<ConveyanceAddAditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveyanceAddAditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveyanceAddAditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
