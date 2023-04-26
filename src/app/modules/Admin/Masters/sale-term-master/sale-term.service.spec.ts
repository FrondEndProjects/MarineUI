import { TestBed } from '@angular/core/testing';

import { SaleTermService } from './sale-term.service';

describe('SaleTermService', () => {
  let service: SaleTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
