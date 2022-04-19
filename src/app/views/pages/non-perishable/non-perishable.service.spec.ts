import { TestBed } from '@angular/core/testing';

import { NonPerishableService } from './non-perishable.service';

describe('NonPerishableService', () => {
  let service: NonPerishableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonPerishableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
