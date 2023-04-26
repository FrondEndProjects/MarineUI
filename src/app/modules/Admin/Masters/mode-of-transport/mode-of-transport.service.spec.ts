import { TestBed } from '@angular/core/testing';

import { ModeOfTransportService } from './mode-of-transport.service';

describe('ModeOfTransportService', () => {
  let service: ModeOfTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeOfTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
