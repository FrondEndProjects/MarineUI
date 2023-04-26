import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePercentageComponent } from './share-percentage.component';

describe('SharePercentageComponent', () => {
  let component: SharePercentageComponent;
  let fixture: ComponentFixture<SharePercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
