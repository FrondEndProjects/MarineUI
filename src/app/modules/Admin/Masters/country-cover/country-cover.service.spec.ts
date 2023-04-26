import { TestBed } from '@angular/core/testing';

import { CountryCoverService } from './country-cover.service';

describe('CountryCoverService', () => {
  let service: CountryCoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryCoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
