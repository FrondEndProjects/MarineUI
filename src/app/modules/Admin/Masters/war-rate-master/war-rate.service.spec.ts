import { TestBed } from '@angular/core/testing';

import { WarRateService } from './war-rate.service';

describe('WarRateService', () => {
  let service: WarRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
