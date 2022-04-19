import { TestBed } from '@angular/core/testing';

import { HOVerificationService } from './ho-verification.service';

describe('VerificationService', () => {
  let service: HOVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HOVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
