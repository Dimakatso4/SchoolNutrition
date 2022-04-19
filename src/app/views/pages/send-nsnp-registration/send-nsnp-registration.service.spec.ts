import { TestBed } from '@angular/core/testing';

import { SendNsnpRegistrationService } from './send-nsnp-registration.service';

describe('NsnpRegistrationService', () => {
  let service: SendNsnpRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendNsnpRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
