import { TestBed } from '@angular/core/testing';

import { NsnpRegistrationService } from './nsnp-registration.service';

describe('NsnpRegistrationService', () => {
  let service: NsnpRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsnpRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
