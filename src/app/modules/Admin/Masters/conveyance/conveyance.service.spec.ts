import { TestBed } from '@angular/core/testing';

import { ConveyanceService } from './conveyance.service';

describe('ConveyanceService', () => {
  let service: ConveyanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConveyanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
