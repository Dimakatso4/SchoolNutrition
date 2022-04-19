import { TestBed } from '@angular/core/testing';

import { HONsnpRegistrationService } from './ho-nsnp-registration.service';

describe('NsnpRegistrationService', () => {
  let service: HONsnpRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HONsnpRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
