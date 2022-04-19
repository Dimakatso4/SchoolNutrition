import { TestBed } from '@angular/core/testing';

import { DistrictVerificationService } from './district-verification.service';

describe('VerificationService', () => {
  let service: DistrictVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
